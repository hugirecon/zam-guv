import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";

// Force Node.js runtime — @react-pdf/renderer does not support edge
export const runtime = "nodejs";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, color: "#1a1a2e" },
  coverPage: { fontFamily: "Helvetica", padding: 40, backgroundColor: "#1b2a6b", color: "#ffffff", minHeight: "100%" },
  coverTitle: { fontSize: 32, fontWeight: "bold", marginTop: 80, marginBottom: 8 },
  coverSub: { fontSize: 16, opacity: 0.7, marginBottom: 40 },
  coverField: { fontSize: 12, marginBottom: 6, opacity: 0.85 },
  coverLabel: { opacity: 0.6, fontSize: 10 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#1b2a6b", marginBottom: 8, marginTop: 16, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", paddingBottom: 4 },
  subTitle: { fontSize: 11, fontWeight: "bold", color: "#374151", marginBottom: 4, marginTop: 10 },
  text: { fontSize: 10, color: "#374151", lineHeight: 1.5 },
  small: { fontSize: 8, color: "#6b7280" },
  row: { flexDirection: "row", marginBottom: 3 },
  label: { width: 120, fontSize: 9, color: "#6b7280" },
  value: { flex: 1, fontSize: 9, color: "#111827" },
  scoreBox: { backgroundColor: "#f3f4f6", borderRadius: 4, padding: 12, marginBottom: 8, flexDirection: "row", alignItems: "center" },
  bigScore: { fontSize: 36, fontWeight: "bold", color: "#1b2a6b", marginRight: 16 },
  barContainer: { marginBottom: 4 },
  barBg: { backgroundColor: "#e5e7eb", height: 6, borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3 },
  bullet: { marginBottom: 3, paddingLeft: 8 },
  footer: { position: "absolute", bottom: 20, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 8, color: "#9ca3af" },
  tag: { backgroundColor: "#dbeafe", color: "#1d4ed8", fontSize: 9, padding: "2 6", borderRadius: 4, marginRight: 4, marginBottom: 4 },
  questionRow: { marginBottom: 8, flexDirection: "row" },
  questionNum: { fontSize: 10, fontWeight: "bold", color: "#1b2a6b", width: 20 },
  questionText: { flex: 1, fontSize: 10, color: "#374151", lineHeight: 1.5 },
});

function scoreColor(s: number) {
  return s >= 80 ? "#16a34a" : s >= 60 ? "#d97706" : "#dc2626";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <View style={{ marginBottom: 6 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
        <Text style={styles.small}>{label.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Text>
        <Text style={[styles.small, { fontWeight: "bold", color: scoreColor(value) }]}>{value}</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${value}%`, backgroundColor: scoreColor(value) }]} />
      </View>
    </View>
  );
}

interface ReportProps {
  candidate: {
    name: string;
    email: string;
    cohort: { name: string } | null;
    sessions: {
      vehicleType: string;
      mode: string;
      locked: boolean;
      tabSwitchCount: number;
      proposals: {
        id: string;
        status: string;
        proposedValue: number;
        submittedAt: Date | string | null;
        aiScore: number | null;
        adminScore: number | null;
        aiScoreBreakdown: string | null;
        aiFeedback: string | null;
        aiInterviewQuestions: string | null;
        adminNotes: string | null;
        contract: { title: string; solicNumber: string };
      }[];
    }[];
  };
  generatedAt: string;
}

function CandidateReport({ candidate, generatedAt }: ReportProps) {
  const allProposals = candidate.sessions.flatMap((s) =>
    s.proposals.map((p) => ({ ...p, session: s }))
  );
  const submittedProposals = allProposals.filter((p) => p.status === "submitted");
  const scoredProposals = submittedProposals.filter((p) => p.aiScore != null || p.adminScore != null);
  const scores = scoredProposals.map((p) => p.adminScore ?? p.aiScore!);
  const compositeScore = scores.length > 0
    ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10
    : null;

  // Aggregate all interview questions
  const allInterviewQs = allProposals.flatMap((p) => {
    if (!p.aiInterviewQuestions) return [];
    try { return JSON.parse(p.aiInterviewQuestions) as string[]; } catch { return []; }
  });

  // Recommendation logic
  let recommendation = "Insufficient data";
  if (compositeScore != null) {
    if (compositeScore >= 80) recommendation = "Strong Candidate — Recommend for Advancement";
    else if (compositeScore >= 65) recommendation = "Competitive Candidate — Consider with Notes";
    else if (compositeScore >= 50) recommendation = "Borderline — Needs Development";
    else recommendation = "Not Recommended at This Time";
  }

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.coverTitle}>{candidate.name}</Text>
        <Text style={styles.coverSub}>VP Candidate Assessment Report</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.coverLabel}>Email</Text>
          <Text style={styles.coverField}>{candidate.email}</Text>
          {candidate.cohort && (
            <>
              <Text style={styles.coverLabel}>Cohort</Text>
              <Text style={styles.coverField}>{candidate.cohort.name}</Text>
            </>
          )}
          <Text style={styles.coverLabel}>Report Generated</Text>
          <Text style={styles.coverField}>{generatedAt}</Text>
        </View>
        {compositeScore != null && (
          <View style={{ marginTop: 40, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 8, padding: 20 }}>
            <Text style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Composite Score</Text>
            <Text style={{ fontSize: 48, fontWeight: "bold" }}>{compositeScore}</Text>
            <Text style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>{recommendation}</Text>
          </View>
        )}
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <View style={styles.scoreBox}>
          <Text style={styles.bigScore}>{compositeScore ?? "—"}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontWeight: "bold", color: "#1b2a6b", marginBottom: 2 }}>Composite Score</Text>
            <Text style={[styles.small, { color: "#374151" }]}>{recommendation}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
          {[
            { label: "Proposals Submitted", value: String(submittedProposals.length) },
            { label: "Vehicles Assessed", value: String(new Set(candidate.sessions.filter((s) => s.locked).map((s) => s.vehicleType)).size) },
            { label: "Sessions", value: String(candidate.sessions.length) },
          ].map(({ label, value }) => (
            <View key={label} style={{ width: "33%", padding: 8, backgroundColor: "#f9fafb", borderRadius: 4, marginBottom: 4, marginRight: "1%" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1b2a6b" }}>{value}</Text>
              <Text style={styles.small}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Score breakdown per vehicle */}
        <Text style={styles.subTitle}>Score Breakdown by Vehicle</Text>
        {candidate.sessions.map((session) => {
          const sessionScored = session.proposals.filter((p) => p.status === "submitted" && (p.aiScore != null || p.adminScore != null));
          if (sessionScored.length === 0) return null;
          const sessionScores = sessionScored.map((p) => p.adminScore ?? p.aiScore!);
          const sessionAvg = Math.round((sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length) * 10) / 10;
          return (
            <View key={session.vehicleType} style={[styles.row, { marginBottom: 6 }]}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>{session.vehicleType}</Text>
              <Text style={[styles.value, { color: scoreColor(sessionAvg), fontWeight: "bold" }]}>{sessionAvg}</Text>
              <Text style={styles.small}> ({sessionScored.length} proposal{sessionScored.length !== 1 ? "s" : ""})</Text>
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Zam.guv — Confidential Assessment Report</Text>
          <Text style={styles.footerText}>{candidate.name}</Text>
        </View>
      </Page>

      {/* Proposal Details — one per proposal */}
      {scoredProposals.map((p, idx) => {
        const breakdown: Record<string, number> = p.aiScoreBreakdown ? JSON.parse(p.aiScoreBreakdown) : {};
        const feedback = p.aiFeedback ? JSON.parse(p.aiFeedback) : {};
        const interviewQs: string[] = p.aiInterviewQuestions ? JSON.parse(p.aiInterviewQuestions) : [];
        const displayScore = p.adminScore ?? p.aiScore;
        return (
          <Page key={p.id} size="A4" style={styles.page}>
            <Text style={styles.sectionTitle}>
              Proposal {idx + 1}: {p.contract.title}
            </Text>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={styles.label}>Solicitation #</Text>
              <Text style={styles.value}>{p.contract.solicNumber}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={styles.label}>Vehicle</Text>
              <Text style={styles.value}>{p.session.vehicleType}</Text>
            </View>
            <View style={[styles.row, { marginBottom: 8 }]}>
              <Text style={styles.label}>Score</Text>
              <Text style={[styles.value, { color: scoreColor(displayScore ?? 0), fontWeight: "bold" }]}>
                {displayScore != null ? displayScore.toFixed(0) : "—"}
                {p.adminScore != null ? " (Admin Override)" : " (AI Score)"}
              </Text>
            </View>

            {/* Score Breakdown */}
            {Object.keys(breakdown).length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.subTitle}>Score Dimensions</Text>
                {Object.entries(breakdown).map(([k, v]) => (
                  <ScoreBar key={k} label={k} value={v} />
                ))}
              </View>
            )}

            {/* Feedback */}
            {feedback.strengths?.length > 0 && (
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.subTitle}>Strengths</Text>
                {feedback.strengths.map((s: string, i: number) => (
                  <Text key={i} style={[styles.bullet, styles.text]}>• {s}</Text>
                ))}
              </View>
            )}
            {feedback.weaknesses?.length > 0 && (
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.subTitle}>Weaknesses</Text>
                {feedback.weaknesses.map((w: string, i: number) => (
                  <Text key={i} style={[styles.bullet, styles.text]}>• {w}</Text>
                ))}
              </View>
            )}

            {/* Interview Questions */}
            {interviewQs.length > 0 && (
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.subTitle}>Interview Questions</Text>
                {interviewQs.map((q, i) => (
                  <View key={i} style={styles.questionRow}>
                    <Text style={styles.questionNum}>{i + 1}.</Text>
                    <Text style={styles.questionText}>{q}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Admin Notes */}
            {p.adminNotes && (
              <View style={{ backgroundColor: "#fefce8", borderRadius: 4, padding: 8, marginTop: 8 }}>
                <Text style={[styles.subTitle, { color: "#713f12" }]}>Admin Notes</Text>
                <Text style={[styles.text, { color: "#713f12" }]}>{p.adminNotes}</Text>
              </View>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerText}>Zam.guv — Confidential Assessment Report</Text>
              <Text style={styles.footerText}>{candidate.name}</Text>
            </View>
          </Page>
        );
      })}

      {/* Interview Questions Summary */}
      {allInterviewQs.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Interview Questions</Text>
          <Text style={[styles.text, { marginBottom: 12 }]}>
            These questions were generated by AI based on weaknesses identified across all proposals.
          </Text>
          {allInterviewQs.map((q, i) => (
            <View key={i} style={styles.questionRow}>
              <Text style={styles.questionNum}>{i + 1}.</Text>
              <Text style={styles.questionText}>{q}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Zam.guv — Confidential Assessment Report</Text>
            <Text style={styles.footerText}>{candidate.name}</Text>
          </View>
        </Page>
      )}
    </Document>
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const user = await getAuthUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  const candidate = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      cohort: { select: { name: true } },
      sessions: {
        orderBy: { startedAt: "desc" },
        select: {
          vehicleType: true,
          mode: true,
          locked: true,
          tabSwitchCount: true,
          proposals: {
            select: {
              id: true,
              status: true,
              proposedValue: true,
              submittedAt: true,
              aiScore: true,
              adminScore: true,
              aiScoreBreakdown: true,
              aiFeedback: true,
              aiInterviewQuestions: true,
              adminNotes: true,
              contract: { select: { title: true, solicNumber: true } },
            },
          },
        },
      },
    },
  });

  if (!candidate) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const generatedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await renderToStream(
    <CandidateReport candidate={candidate as any} generatedAt={generatedAt} />
  );

  return new Response(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${candidate.name.replace(/\s+/g, "_")}_Report.pdf"`,
    },
  });
}
