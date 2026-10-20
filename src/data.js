export const INITIAL_REQUESTS = [
  { id: "SR-2026-00125", title: "HVAC Maintenance", category: "Maintenance", location: "Main facility",
    status: "In Progress", priority: "High", created: "2026-10-10", scheduled: "2026-10-12", updated: "2026-10-12" },
  { id: "SR-2026-00124", title: "Electrical Inspection", category: "Inspection", location: "Warehouse",
    status: "Scheduled", priority: "Normal", created: "2026-10-08", scheduled: "2026-10-14", updated: "2026-10-11" },
  { id: "SR-2026-00118", title: "Equipment Repair", category: "Repair", location: "Production floor",
    status: "Completed", priority: "High", created: "2026-10-03", scheduled: null, updated: "2026-10-06" },
  { id: "SR-2026-00110", title: "Preventive Maintenance", category: "Maintenance", location: "Main facility",
    status: "Under Review", priority: "Normal", created: "2026-09-28", scheduled: null, updated: "2026-09-29" },
];

export const STATUSES = ["Under Review", "Scheduled", "In Progress", "Completed"];

export const STATUS_CLASS = {
  "In Progress": "sd-badge--progress",
  Scheduled: "sd-badge--scheduled",
  Completed: "sd-badge--completed",
  "Under Review": "sd-badge--review",
};

export const PRIORITY_RANK = { Urgent: 4, High: 3, Normal: 2, Low: 1 };
export const isHigh = (p) => p === "High" || p === "Urgent";

export const pad = (n) => String(n).padStart(2, "0");

export function nextRequestId(requests) {
  const max = Math.max(...requests.map((r) => Number(r.id.split("-").pop())));
  return `SR-2026-${String(max + 1).padStart(5, "0")}`;
}

export const todayISO = () => new Date().toISOString().slice(0, 10);

// "2026-10-12" -> "12 Oct 2026"
export function fmtISO(iso) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(",", "");
}
