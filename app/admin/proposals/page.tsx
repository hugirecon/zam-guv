"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

interface Proposal {
  id: string;
  status: string;
  proposedValue: number;
  aiScore: number | null;
  aiFeedback: string | null;
  aiScoreBreakdown: string | null;
  submittedAt: string | null;
  autoSubmitted: boolean;
  contract: { title: string; solicNumber: string; agency: string };
  user: { name: string; email: string };
}

export default function AdminProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Proposal | null>(null);

  useEffect(() => {
    fetch("/api/proposals")
      .then(r => r.json())
      .then(setProposals)
      .finally(() => setLoading(false));
  }, []);

  const scoreColor = (s: number | null) => {
    if (!s) return "text-gray-400";
    return s >= 80 ? "text-green-600" : s >= 60 ? "text-yellow-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
        <p className="text-gray-500 mt-1">{proposals.length} proposals across all VPs</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <div className="xl:col-span-2">
          <Card>
            {loading ? (
              <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" /></div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No proposals yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Contract</th>
                      <th className="text-left px-4 py-3 font-medium">VP</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-left px-4 py-3 font-medium">AI Score</th>
                      <th className="text-left px-4 py-3 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {proposals.map(p => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelected(selected?.id === p.id ? null : p)}
                      >
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900 max-w-48 truncate">{p.contract.title}</p>
                          <p className="text-xs font-mono text-gray-500">{p.contract.solicNumber}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{p.user.name}</td>
                        <td className="px-4 py-3">
                          <Badge variant={p.status === "submitted" ? "success" : "warning"}>
                            {p.status}
                          </Badge>
                          {p.autoSubmitted && <span className="ml-1 text-xs text-gray-400">(auto)</span>}
                        </td>
                        <td className={`px-4 py-3 font-bold text-lg ${scoreColor(p.aiScore)}`}>
                          {p.aiScore !== null ? p.aiScore.toFixed(0) : "—"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {p.proposedValue ? `$${(p.proposedValue/1e6).toFixed(1)}M` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Detail panel */}
        {selected && (
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selected.user.name}</h3>
                    <p className="text-sm text-gray-500">{selected.contract.title}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selected.aiScore !== null && (
                  <div className="text-center py-3 bg-gray-50 rounded-lg">
                    <p className={`text-4xl font-bold ${scoreColor(selected.aiScore)}`}>{selected.aiScore.toFixed(0)}</p>
                    <p className="text-xs text-gray-500">AI Score / 100</p>
                  </div>
                )}

                {selected.aiScoreBreakdown && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase">Breakdown</p>
                    {Object.entries(JSON.parse(selected.aiScoreBreakdown)).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 capitalize w-28">{k.replace("_", " ")}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${v as number}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{v as number}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selected.aiFeedback && (() => {
                  const fb = JSON.parse(selected.aiFeedback);
                  return (
                    <div className="space-y-3">
                      {fb.recommendation && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Recommendation</p>
                          <Badge variant={fb.recommendation === "Award" ? "success" : fb.recommendation === "High Competitive" ? "info" : "warning"}>
                            {fb.recommendation}
                          </Badge>
                        </div>
                      )}
                      {fb.feedback && (
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Assessment</p>
                          <p className="text-sm text-gray-700">{fb.feedback}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-100">
                  <p>Submitted: {selected.submittedAt ? new Date(selected.submittedAt).toLocaleString() : "—"}</p>
                  <p>Proposed Value: {selected.proposedValue ? `$${selected.proposedValue.toLocaleString()}` : "—"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
