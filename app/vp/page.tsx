"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Contract {
  id: string;
  solicNumber: string;
  title: string;
  agency: string;
  subAgency: string | null;
  description: string;
  naicsCode: string;
  setAside: string | null;
  valueMin: number;
  valueMax: number;
  dueDate: string;
  pob: string;
  securityClear: string;
  type: string;
  _count: { proposals: number };
}

const setAsideVariant: Record<string, "info" | "success" | "warning" | "purple" | "default"> = {
  "8(a)": "info",
  SDVOSB: "success",
  HUBZone: "warning",
  WOSB: "purple",
  SB: "default",
  Unrestricted: "default",
};

const clearanceVariant: Record<string, "default" | "warning" | "danger"> = {
  None: "default",
  Secret: "warning",
  "Top Secret": "danger",
  "TS/SCI": "danger",
};

function formatValue(min: number, max: number) {
  const fmt = (n: number) =>
    n >= 1e9
      ? `$${(n / 1e9).toFixed(1)}B`
      : n >= 1e6
      ? `$${(n / 1e6).toFixed(0)}M`
      : `$${(n / 1e3).toFixed(0)}K`;
  if (min === 0 && max > 0) return `Up to ${fmt(max)}`;
  if (min === max) return fmt(min);
  return `${fmt(min)} – ${fmt(max)}`;
}

export default function VPDashboard() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSetAside, setFilterSetAside] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterClear, setFilterClear] = useState("");
  const [myProposals, setMyProposals] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filterSetAside) params.set("setAside", filterSetAside);
    if (filterType) params.set("type", filterType);
    if (filterClear) params.set("securityClear", filterClear);

    fetch(`/api/contracts?${params}`)
      .then((r) => r.json())
      .then(setContracts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, filterSetAside, filterType, filterClear]);

  useEffect(() => {
    fetch("/api/proposals")
      .then((r) => r.json())
      .then((proposals: { contractId: string }[]) => {
        setMyProposals(new Set(proposals.map((p) => p.contractId)));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contract Opportunities</h1>
        <p className="text-gray-500 mt-1">
          {contracts.length} active solicitations — select a contract to draft and submit your proposal.
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search contracts, agencies, solicitation numbers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-64 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterSetAside}
            onChange={(e) => setFilterSetAside(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Set-Asides</option>
            {["8(a)", "SDVOSB", "HUBZone", "WOSB", "SB", "Unrestricted"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {["FFP", "T&M", "CPFF", "IDIQ", "BPA"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            value={filterClear}
            onChange={(e) => setFilterClear(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Clearances</option>
            {["None", "Secret", "Top Secret", "TS/SCI"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {(search || filterSetAside || filterType || filterClear) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setFilterSetAside("");
                setFilterType("");
                setFilterClear("");
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      </Card>

      {/* Contract grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No contracts match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contracts.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-5 cursor-pointer relative group"
              onClick={() => router.push(`/vp/contracts/${c.id}`)}
            >
              {myProposals.has(c.id) && (
                <div className="absolute top-3 right-3">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    ✓ Proposal started
                  </span>
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-mono">{c.solicNumber}</p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mt-0.5 pr-28">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">{c.agency}</p>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">{c.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={setAsideVariant[c.setAside || "Unrestricted"] || "default"}>
                    {c.setAside || "Unrestricted"}
                  </Badge>
                  <Badge variant="default">{c.type}</Badge>
                  {c.securityClear !== "None" && (
                    <Badge variant={clearanceVariant[c.securityClear] || "default"}>
                      {c.securityClear}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-700 font-medium">{formatValue(c.valueMin, c.valueMax)}</div>
                  <div className="text-gray-500">
                    Due:{" "}
                    {new Date(c.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {c.pob}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
