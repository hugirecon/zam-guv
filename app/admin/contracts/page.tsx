"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface Contract {
  id: string;
  solicNumber: string;
  title: string;
  agency: string;
  setAside: string | null;
  type: string;
  valueMin: number;
  valueMax: number;
  dueDate: string;
  securityClear: string;
  _count: { proposals: number };
}

function fmt(min: number, max: number) {
  const f = (n: number) => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(0)}M` : `$${(n/1e3).toFixed(0)}K`;
  if (min === 0) return `≤ ${f(max)}`;
  return `${f(min)}–${f(max)}`;
}

export default function AdminContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    fetch(`/api/contracts?${p}`)
      .then(r => r.json())
      .then(setContracts)
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-500 mt-1">{contracts.length} active solicitations in the system</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search contracts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Solicitation</th>
                  <th className="text-left px-6 py-3 font-medium">Agency</th>
                  <th className="text-left px-6 py-3 font-medium">Set-Aside</th>
                  <th className="text-left px-6 py-3 font-medium">Type</th>
                  <th className="text-left px-6 py-3 font-medium">Value</th>
                  <th className="text-left px-6 py-3 font-medium">Due</th>
                  <th className="text-left px-6 py-3 font-medium">Proposals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contracts.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-mono text-xs text-gray-500">{c.solicNumber}</p>
                      <p className="text-sm font-medium text-gray-900 max-w-80">{c.title}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.agency}</td>
                    <td className="px-6 py-4"><Badge variant="info">{c.setAside || "Unrestricted"}</Badge></td>
                    <td className="px-6 py-4"><Badge>{c.type}</Badge></td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{fmt(c.valueMin, c.valueMax)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(c.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${c._count.proposals > 0 ? "text-blue-600" : "text-gray-400"}`}>
                        {c._count.proposals}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
