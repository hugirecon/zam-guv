"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const TYPE_LABELS: Record<string, string> = {
  Solicitation: "Solicitation",
  "Sources Sought": "Sources Sought",
  Presolicitation: "Presolicitation",
  "Award Notice": "Award Notice",
  "Special Notice": "Special Notice",
};

// Accordion filter section
function FilterSection({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #c9c9c9" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 12px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "700",
          color: "#1b1b1b",
          textAlign: "left",
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: "12px", color: "#71767a" }}>{open ? "∧" : "∨"}</span>
      </button>
      {open && (
        <div style={{ padding: "4px 12px 12px 12px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function VPDashboard() {
  const router = useRouter();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSetAside, setFilterSetAside] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterClear, setFilterClear] = useState("");
  const [searchMode, setSearchMode] = useState("all");
  const [statusActive, setStatusActive] = useState(true);
  const [statusInactive, setStatusInactive] = useState(false);
  const [myProposals, setMyProposals] = useState<Set<string>>(new Set());
  const [pendingSearch, setPendingSearch] = useState("");

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

  const handleSearch = () => {
    setSearch(pendingSearch);
  };

  const handleReset = () => {
    setPendingSearch("");
    setSearch("");
    setFilterSetAside("");
    setFilterType("");
    setFilterClear("");
    setSearchMode("all");
    setStatusActive(true);
    setStatusInactive(false);
  };

  const hasFilters = search || filterSetAside || filterType || filterClear;

  return (
    <div style={{ display: "flex", gap: "0", marginTop: "0", alignItems: "flex-start" }}>
      {/* LEFT SIDEBAR — Filters */}
      <aside style={{
        width: "250px",
        minWidth: "250px",
        background: "#e8f1f9",
        borderRight: "1px solid #dfe1e2",
        minHeight: "calc(100vh - 120px)",
        paddingTop: "0",
      }}>
        {/* Filter by header */}
        <div style={{
          background: "#1b2a6b",
          color: "#ffffff",
          padding: "10px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "13px",
          fontWeight: "700",
        }}>
          <span>Filter By</span>
          <span style={{ cursor: "pointer", fontSize: "16px" }}>–</span>
        </div>

        {/* Keyword Search */}
        <div style={{ padding: "12px", borderBottom: "1px solid #c9c9c9" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#1b1b1b", marginBottom: "8px" }}>Keyword Search</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "8px" }}>
            {[
              { value: "any", label: "Any Words" },
              { value: "all", label: "All Words" },
              { value: "exact", label: "Exact Phrase" },
            ].map((opt) => (
              <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer", color: "#1b1b1b" }}>
                <input
                  type="radio"
                  name="searchMode"
                  value={opt.value}
                  checked={searchMode === opt.value}
                  onChange={() => setSearchMode(opt.value)}
                  style={{ accentColor: "#005ea2" }}
                />
                {opt.label}
              </label>
            ))}
          </div>
          <input
            type="text"
            value={pendingSearch}
            onChange={(e) => setPendingSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. W91QVN-17-R-008"
            style={{
              width: "100%",
              border: "1px solid #adadad",
              borderRadius: "2px",
              padding: "6px 8px",
              fontSize: "12px",
              marginBottom: "8px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              width: "100%",
              background: "#005ea2",
              color: "#ffffff",
              border: "none",
              borderRadius: "2px",
              padding: "7px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* Accordion sections */}
        <FilterSection title="Federal Organizations" />
        <FilterSection title="Dates" />
        <FilterSection title="Notice Type">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {["Solicitation", "Sources Sought", "Presolicitation", "Award Notice", "Special Notice"].map((t) => (
              <label key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer", color: "#1b1b1b" }}>
                <input
                  type="checkbox"
                  checked={filterType === t}
                  onChange={() => setFilterType(filterType === t ? "" : t)}
                  style={{ accentColor: "#005ea2" }}
                />
                {t}
              </label>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Product or Service Information" />
        <FilterSection title="Set Aside">
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {["8(a)", "SDVOSB", "HUBZone", "WOSB", "SB", "Unrestricted"].map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer", color: "#1b1b1b" }}>
                <input
                  type="checkbox"
                  checked={filterSetAside === s}
                  onChange={() => setFilterSetAside(filterSetAside === s ? "" : s)}
                  style={{ accentColor: "#005ea2" }}
                />
                {s}
              </label>
            ))}
          </div>
        </FilterSection>
        <FilterSection title="Place of Performance" />
        <FilterSection title="Contract Awardee" />
        <FilterSection title="Status" defaultOpen>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer", color: "#1b1b1b" }}>
              <input
                type="checkbox"
                checked={statusActive}
                onChange={() => setStatusActive(!statusActive)}
                style={{ accentColor: "#005ea2" }}
              />
              Active
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer", color: "#1b1b1b" }}>
              <input
                type="checkbox"
                checked={statusInactive}
                onChange={() => setStatusInactive(!statusInactive)}
                style={{ accentColor: "#005ea2" }}
              />
              Inactive
            </label>
          </div>
        </FilterSection>

        {/* Bottom filter links */}
        <div style={{ padding: "10px 12px", display: "flex", gap: "16px", fontSize: "12px" }}>
          <a href="#" style={{ color: "#005ea2", textDecoration: "none" }}>≡ More Filters</a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleReset(); }}
            style={{ color: "#005ea2", textDecoration: "none" }}
          >
            ↺ Reset
          </a>
        </div>
      </aside>

      {/* RIGHT — Main content */}
      <div style={{ flex: 1, minWidth: 0, padding: "0 0 40px 0" }}>
        {/* Tab bar */}
        <div style={{ background: "#ffffff", borderBottom: "1px solid #dfe1e2" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "0 24px", overflowX: "auto" }}>
            <span style={{ fontSize: "12px", color: "#71767a", marginRight: "8px", whiteSpace: "nowrap" }}>
              Contracting ∧
            </span>
            <span style={{ color: "#dfe1e2", marginRight: "8px" }}>|</span>
            <span style={{ fontSize: "12px", color: "#71767a", marginRight: "8px" }}>{"<"}</span>
            {[
              { label: "Contract Opportunities", active: true },
              { label: "Contract Awards" },
              { label: "Subcontract Reports" },
            ].map((tab) => (
              <button
                key={tab.label}
                style={{
                  padding: "14px 16px",
                  fontSize: "14px",
                  fontWeight: tab.active ? "700" : "400",
                  color: tab.active ? "#1b2a6b" : "#565c65",
                  background: "transparent",
                  border: "none",
                  borderBottom: tab.active ? "3px solid #00a91c" : "3px solid transparent",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  marginRight: "4px",
                }}
              >
                {tab.label}
              </button>
            ))}
            <span style={{ fontSize: "12px", color: "#71767a", marginLeft: "8px" }}>{">"}</span>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Results header */}
          <div style={{ marginBottom: "16px" }}>
            {hasFilters ? (
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1b1b1b", margin: "0 0 4px" }}>
                Search Results
              </h2>
            ) : (
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#1b1b1b", margin: "0 0 4px" }}>
                Contract Opportunities
              </h2>
            )}
            {!loading && (
              <p style={{ fontSize: "14px", color: "#565c65", margin: 0 }}>
                {contracts.length} active solicitation{contracts.length !== 1 ? "s" : ""} found
              </p>
            )}
          </div>

          {/* Contract list */}
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "64px 0" }}>
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          ) : contracts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#71767a" }}>
              <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Set Your Search Criteria</p>
              <p style={{ fontSize: "14px" }}>Use the filters on the left or enter a keyword to search for contract opportunities.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {contracts.map((c, idx) => (
                <ContractCard
                  key={c.id}
                  contract={c}
                  hasProposal={myProposals.has(c.id)}
                  onClick={() => router.push(`/vp/contracts/${c.id}`)}
                  isLast={idx === contracts.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContractCard({
  contract: c,
  hasProposal,
  onClick,
  isLast,
}: {
  contract: Contract;
  hasProposal: boolean;
  onClick: () => void;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const dueDate = new Date(c.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Map type to notice label
  const noticeType = c.type || "Solicitation";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#f8fbff" : "#ffffff",
        border: "1px solid #dfe1e2",
        borderBottom: isLast ? "1px solid #dfe1e2" : "none",
        padding: "16px 20px",
        cursor: "pointer",
        transition: "background 0.1s",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "6px", alignItems: "center" }}>
        {/* Notice type badge */}
        <span style={{
          display: "inline-block",
          background: "#e8f1f9",
          color: "#1a4480",
          border: "1px solid #b9d0e8",
          borderRadius: "2px",
          padding: "2px 8px",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.3px",
        }}>
          {noticeType}
        </span>
        {/* Set-aside badge */}
        {c.setAside && c.setAside !== "Unrestricted" && (
          <span style={{
            display: "inline-block",
            background: "#e7f2e7",
            color: "#168216",
            border: "1px solid #9ad29a",
            borderRadius: "2px",
            padding: "2px 8px",
            fontSize: "11px",
            fontWeight: "600",
          }}>
            {c.setAside}
          </span>
        )}
        {/* Proposal started badge */}
        {hasProposal && (
          <span style={{
            display: "inline-block",
            background: "#e7f2e7",
            color: "#168216",
            border: "1px solid #9ad29a",
            borderRadius: "2px",
            padding: "2px 8px",
            fontSize: "11px",
            fontWeight: "600",
            marginLeft: "auto",
          }}>
            ✓ Proposal Started
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: "16px",
        fontWeight: "700",
        color: hovered ? "#003a6b" : "#005ea2",
        margin: "0 0 4px",
        textDecoration: hovered ? "underline" : "none",
        lineHeight: "1.3",
      }}>
        {c.title}
      </h3>

      {/* Agency */}
      <p style={{ fontSize: "13px", color: "#1b1b1b", margin: "0 0 8px" }}>{c.agency}</p>

      {/* Details row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "13px", color: "#565c65" }}>
        <span>
          <strong style={{ color: "#1b1b1b" }}>Solicitation #:</strong> {c.solicNumber}
        </span>
        <span>
          <strong style={{ color: "#1b1b1b" }}>NAICS:</strong> {c.naicsCode}
        </span>
        <span>
          <strong style={{ color: "#1b1b1b" }}>Response Deadline:</strong> {dueDate}
        </span>
        {(c.valueMin > 0 || c.valueMax > 0) && (
          <span>
            <strong style={{ color: "#1b1b1b" }}>Contract Value:</strong> {formatValue(c.valueMin, c.valueMax)}
          </span>
        )}
      </div>

      {c.pob && (
        <div style={{ marginTop: "6px", fontSize: "13px", color: "#565c65" }}>
          <strong style={{ color: "#1b1b1b" }}>Place of Performance:</strong> {c.pob}
        </div>
      )}
    </div>
  );
}
