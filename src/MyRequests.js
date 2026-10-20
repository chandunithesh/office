import { useMemo, useState } from "react";
import { Plus, Search, ArrowUpRight, Flag, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import StatsStrip from "./StatsStrip.js";
import { STATUSES, STATUS_CLASS, PRIORITY_RANK, isHigh, fmtISO } from "./data.js";
import "./MyRequests.css";

const PAGE_SIZE = 5;

const SORTS = {
  "Request date": (a, b) => b.created.localeCompare(a.created),
  "Last updated": (a, b) => b.updated.localeCompare(a.updated),
  Priority: (a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority],
  Status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status),
};

const DEFAULTS = { query: "", status: "", category: "", from: "", to: "", sort: "Request date" };

export default function MyRequests({ requests, onNavigate }) {
  const [filters, setFilters] = useState(DEFAULTS);
  const [page, setPage] = useState(1);

  const categories = useMemo(() => [...new Set(requests.map((r) => r.category))].sort(), [requests]);

  const change = (name) => (e) => {
    setFilters((f) => ({ ...f, [name]: e.target.value }));
    setPage(1);
  };
  const clear = () => {
    setFilters(DEFAULTS);
    setPage(1);
  };
  const filtersActive = JSON.stringify(filters) !== JSON.stringify(DEFAULTS);

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return requests
      .filter((r) => !q || r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
      .filter((r) => !filters.status || r.status === filters.status)
      .filter((r) => !filters.category || r.category === filters.category)
      .filter((r) => !filters.from || r.created >= filters.from)
      .filter((r) => !filters.to || r.created <= filters.to)
      .sort(SORTS[filters.sort]);
  }, [requests, filters]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <main className="sd-main">
      <div className="sd-page-head">
        <div>
          <div className="sd-eyebrow">EVERY REQUEST, IN ONE PLACE</div>
          <h1>My Service Requests</h1>
          <p className="sd-muted">Follow your service progress and revisit past requests.</p>
        </div>
        <button className="sd-btn sd-btn--primary" onClick={() => onNavigate("raise")}>
          <Plus size={14} /> New Request
        </button>
      </div>

      <StatsStrip requests={requests} />

      <div className="sd-filters">
        <div className="sd-filters__row">
          <div className="sd-search">
            <Search size={15} />
            <input
              type="search" placeholder="Search by request ID or title…" aria-label="Search requests"
              value={filters.query} onChange={change("query")}
            />
          </div>
          <select className="sd-input sd-select--sm" aria-label="Filter by status" value={filters.status} onChange={change("status")}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="sd-input sd-select--sm" aria-label="Filter by category" value={filters.category} onChange={change("category")}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="sd-filters__row sd-filters__row--dates">
          <label className="sd-inline">
            From <input type="date" className="sd-input" value={filters.from} onChange={change("from")} />
          </label>
          <label className="sd-inline">
            To <input type="date" className="sd-input" value={filters.to} onChange={change("to")} />
          </label>
          <select className="sd-input sd-select--sm" aria-label="Sort by" value={filters.sort} onChange={change("sort")}>
            {Object.keys(SORTS).map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="sd-clear" onClick={clear} disabled={!filtersActive}>Clear filters</button>
        </div>
      </div>

      <div className="sd-card sd-table sd-table--requests">
        <div className="sd-table__row sd-table__head">
          <span>Request details</span>
          <span>Category / location</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Schedule / updated</span>
          <span />
        </div>

        {visible.length === 0 && (
          <div className="sd-empty">
            <strong>No requests match your filters</strong>
            <span className="sd-muted">Try a different search or clear the filters to see everything.</span>
            <button className="sd-btn sd-btn--ghost sd-btn--auto" onClick={clear}>Clear filters</button>
          </div>
        )}

        {visible.map((r) => (
          <div className="sd-table__row" key={r.id}>
            <span>
              <strong className="sd-req-title">{r.title}</strong>
              <a href="#" className="sd-req-id" onClick={(e) => e.preventDefault()}>{r.id}</a>
              <small className="sd-req-date">{fmtISO(r.created)}</small>
            </span>
            <span>
              <span className="sd-cell-main">{r.category}</span>
              <small className="sd-cell-sub">{r.location}</small>
            </span>
            <span><span className={`sd-badge ${STATUS_CLASS[r.status]}`}><i />{r.status}</span></span>
            <span className={`sd-priority ${isHigh(r.priority) ? "is-high" : "is-normal"}`}>
              {isHigh(r.priority) ? <Flag size={12} /> : <Minus size={12} />} {r.priority}
            </span>
            <span>
              <span className="sd-cell-main">{r.scheduled ? fmtISO(r.scheduled) : "Not scheduled"}</span>
              <small className="sd-cell-sub">Updated {fmtISO(r.updated)}</small>
            </span>
            <span className="sd-open">
              <a href="#" aria-label={`Open ${r.title}`} onClick={(e) => e.preventDefault()}>
                <ArrowUpRight size={14} />
              </a>
            </span>
          </div>
        ))}

        <div className="sd-table__foot">
          <span>Showing {visible.length} {visible.length === 1 ? "request" : "requests"}</span>
          <span className="sd-chip">Sample records</span>
        </div>
      </div>

      <div className="sd-pager">
        <button className="sd-pager__btn" aria-label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)}>
          <ChevronLeft size={14} />
        </button>
        <span className="sd-pager__label">Page {current} of {pages}</span>
        <button className="sd-pager__btn" aria-label="Next page" disabled={current === pages} onClick={() => setPage(current + 1)}>
          <ChevronRight size={14} />
        </button>
      </div>
    </main>
  );
}
