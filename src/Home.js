import {
  Plus, ClipboardList, Building2, Calendar, ArrowRight, ArrowUpRight, Clock,
  Flag, Minus, Phone, Mail, Headphones, Info, ShieldCheck,
} from "lucide-react";
import StatsStrip from "./StatsStrip.js";
import { STATUS_CLASS, fmtISO, isHigh } from "./data.js";
import "./Home.css";

function ActionCard({ featured, number, icon: Icon, title, text, cta, primary, onClick }) {
  return (
    <article className={`sd-card sd-action ${featured ? "sd-action--featured" : ""}`}>
      <span className="sd-action__num">{number}</span>
      <span className={`sd-action__icon ${featured ? "is-primary" : ""}`}><Icon size={18} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      {primary ? (
        <button className="sd-btn sd-btn--primary" onClick={onClick}>
          <Plus size={14} /> {cta} <ArrowRight size={14} />
        </button>
      ) : (
        <button className="sd-link" onClick={onClick}>{cta} <ArrowRight size={14} /></button>
      )}
    </article>
  );
}

export default function Home({ requests, flash, onDismissFlash, onNavigate }) {
  const today = new Date()
    .toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    .replace(",", "");

  const recent = requests.slice(0, 4);

  return (
    <main className="sd-main">
      {flash && (
        <div className="sd-flash" role="status">
          <span>{flash}</span>
          <button onClick={onDismissFlash}>Dismiss</button>
        </div>
      )}

      <div className="sd-welcome">
        <div>
          <div className="sd-eyebrow">YOUR SERVICE, SIMPLIFIED</div>
          <h1>Welcome back, Apex Industries<span>.</span></h1>
          <p className="sd-muted">How can we help you today?</p>
        </div>
        <div className="sd-date"><Calendar size={13} /> {today}</div>
      </div>

      <div className="sd-actions">
        <ActionCard
          featured primary number="01" icon={Plus}
          title="Raise a Service Request"
          text="Something needs attention? Tell us what you need and we'll take it from here."
          cta="New Service Request"
          onClick={() => onNavigate("raise")}
        />
        <ActionCard
          number="02" icon={ClipboardList}
          title="My Service Requests"
          text="Stay in the loop. Track your requests and view your service history."
          cta="View My Requests"
          onClick={() => onNavigate("requests")}
        />
        <ActionCard
          number="03" icon={Building2}
          title="About & Contact"
          text="Get to know your service partner or connect with our support team."
          cta="Get in Touch"
          onClick={() => onNavigate("about")}
        />
      </div>

      <StatsStrip requests={requests} />

      <div className="sd-lower">
        <section>
          <div className="sd-section-head">
            <div>
              <h2>My Recent Requests</h2>
              <p>A quick look at your latest service activity.</p>
            </div>
            <button className="sd-link" onClick={() => onNavigate("requests")}>
              View all requests <ArrowRight size={14} />
            </button>
          </div>

          <div className="sd-card sd-table">
            <div className="sd-table__row sd-table__head">
              <span>Request details</span><span>Requested on</span><span>Status</span><span>Priority</span><span />
            </div>

            {recent.map((r) => {
              const high = isHigh(r.priority);
              return (
                <div className="sd-table__row" key={r.id}>
                  <span>
                    <strong className="sd-req-title">{r.title}</strong>
                    <a href="#" className="sd-req-id" onClick={(e) => e.preventDefault()}>{r.id}</a>
                  </span>
                  <span className="sd-muted">{fmtISO(r.created)}</span>
                  <span><span className={`sd-badge ${STATUS_CLASS[r.status]}`}><i />{r.status}</span></span>
                  <span className={`sd-priority ${high ? "is-high" : ""}`}>
                    {high ? <Flag size={12} /> : <Minus size={12} />} {r.priority}
                  </span>
                  <span className="sd-open">
                    <a href="#" aria-label={`Open ${r.title}`} onClick={(e) => e.preventDefault()}>
                      <ArrowUpRight size={14} />
                    </a>
                  </span>
                </div>
              );
            })}

            <div className="sd-table__foot">
              <span>Showing {recent.length} requests</span>
              <span className="sd-chip">Sample records</span>
            </div>
          </div>
        </section>

        <aside className="sd-card sd-help">
          <div className="sd-help__top">
            <span className="sd-help__photo" aria-hidden="true" />
            <span className="sd-help__badge"><Headphones size={16} /></span>
          </div>
          <h3>A little help, whenever you need it.</h3>
          <p>Our support team is here to help with your service enquiries.</p>
          <ul>
            <li><Phone size={13} /> Phone not configured</li>
            <li><Mail size={13} /> Email not configured</li>
          </ul>
          <button className="sd-btn sd-btn--ghost" onClick={() => onNavigate("about")}>
            Contact Support <ArrowRight size={14} />
          </button>
          <div className="sd-help__hours"><Clock size={12} /> Business hours not configured.</div>
        </aside>
      </div>

      <div className="sd-notice">
        <Info size={13} />
        <span>
          Your preferred service date is a request, not a confirmed appointment.
          We'll keep you updated as your request progresses.
        </span>
      </div>

      <footer className="sd-footer">
        <ShieldCheck size={13} /> Your service requests. All in one place.
        <span className="sd-chip">Demo portal</span>
      </footer>
    </main>
  );
}
