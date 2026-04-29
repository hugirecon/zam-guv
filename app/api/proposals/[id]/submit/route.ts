import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || "" });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { autoSubmit = false } = await req.json().catch(() => ({}));

  const proposal = await prisma.proposal.findUnique({
    where: { id },
    include: { contract: true, session: true },
  });

  if (!proposal) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (user.role === "vp" && proposal.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (proposal.status === "submitted") {
    return NextResponse.json({ error: "Already submitted" }, { status: 400 });
  }

  // Mark as submitted
  const submitted = await prisma.proposal.update({
    where: { id },
    data: {
      status: "submitted",
      submittedAt: new Date(),
      autoSubmitted: autoSubmit,
    },
  });

  // Trigger async AI scoring (fire and forget for now)
  scoreProposalAsync(id, proposal).catch(console.error);

  return NextResponse.json(submitted);
}

async function scoreProposalAsync(proposalId: string, proposal: {
  contract: { title: string; description: string; requirements: string; naicsCode: string; valueMin: number; valueMax: number };
  executiveSummary: string;
  technicalApproach: string;
  managementApproach: string;
  pricingNarrative: string;
  pastPerformance: string;
  proposedValue: number;
}) {
  if (!process.env.ANTHROPIC_API_KEY) return;

  try {
    const requirements = JSON.parse(proposal.contract.requirements || "[]");
    const prompt = `You are a government contracting expert evaluating a proposal response. Score this proposal on a 0-100 scale across multiple dimensions.

CONTRACT: ${proposal.contract.title}
DESCRIPTION: ${proposal.contract.description}
REQUIREMENTS: ${requirements.join(", ")}
NAICS: ${proposal.contract.naicsCode}
VALUE RANGE: $${(proposal.contract.valueMin / 1e6).toFixed(1)}M - $${(proposal.contract.valueMax / 1e6).toFixed(1)}M

PROPOSAL CONTENT:
Executive Summary: ${proposal.executiveSummary}
Technical Approach: ${proposal.technicalApproach}
Management Approach: ${proposal.managementApproach}
Pricing Narrative: ${proposal.pricingNarrative}
Past Performance: ${proposal.pastPerformance}
Proposed Value: $${proposal.proposedValue.toLocaleString()}

Provide your evaluation as JSON with this exact structure:
{
  "overall": <0-100>,
  "breakdown": {
    "technical": <0-100>,
    "management": <0-100>,
    "pricing": <0-100>,
    "past_performance": <0-100>,
    "compliance": <0-100>
  },
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendation": "<Award | High Competitive | Competitive | Non-Competitive>",
  "feedback": "<2-3 sentences of overall assessment>"
}

Be rigorous. Grade based on specificity, relevance to requirements, and win probability.`;

    const message = await anthropic.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") return;

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return;

    const result = JSON.parse(jsonMatch[0]);

    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        aiScore: result.overall,
        aiScoreBreakdown: JSON.stringify(result.breakdown),
        aiFeedback: JSON.stringify({
          strengths: result.strengths,
          weaknesses: result.weaknesses,
          recommendation: result.recommendation,
          feedback: result.feedback,
        }),
        aiScoredAt: new Date(),
      },
    });
  } catch (err) {
    console.error("AI scoring failed:", err);
  }
}
