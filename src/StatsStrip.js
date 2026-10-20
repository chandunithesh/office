import { ClipboardList, Clock, Loader, CheckCircle2 } from "lucide-react";
import { pad } from "./data.js";
import "./StatsStrip.css";

function Stat({ label, value, icon: Icon, tone }) {
  return (
    <div className="sd-stat">
      <span className={`sd-stat__icon sd-tone--${tone}`}><Icon size={18} /></span>
      <div>
        <div className="sd-stat__label">{label}</div>
        <div className="sd-stat__value">{pad(value)}</div>
      </div>
    </div>
  );
}

export default function StatsStrip({ requests }) {
  const total = requests.length;
  const completed = requests.filter((r) => r.status === "Completed").length;
  const inProgress = requests.filter((r) => r.status === "In Progress").length;
  const open = total - completed;

  return (
    <div className="sd-card sd-stats">
      <Stat label="Total requests" value={total} icon={ClipboardList} tone="grey" />
      <Stat label="Open requests" value={open} icon={Clock} tone="amber" />
      <Stat label="In progress" value={inProgress} icon={Loader} tone="blue" />
      <Stat label="Completed" value={completed} icon={CheckCircle2} tone="green" />
    </div>
  );
}
