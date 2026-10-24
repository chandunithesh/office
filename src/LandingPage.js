import {
  ArrowRight,
  Boxes,
  ChartNoAxesCombined,
  Check,
  Clock3,
  ClipboardCheck,
  ClipboardList,
  Headset,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  Users,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./LandingPage.css";

const features = [
  [
    TicketCheck,
    "Smart ticket management",
    "Manage requests, create tickets, assign technicians, and follow every job.",
  ],
  [
    Clock3,
    "Technician management",
    "See availability, attendance, clock-ins, and assigned work orders.",
  ],
  [
    ShieldCheck,
    "Secure OTP verification",
    "Confirm technician arrival and completed service with customer verification.",
  ],
  [
    Boxes,
    "Inventory management",
    "Track spare parts, replacement products, stock levels, and issue requests.",
  ],
  [
    ClipboardCheck,
    "Warranty and billing",
    "Apply warranty rules, calculate charges, and track invoices and payments.",
  ],
  [
    ChartNoAxesCombined,
    "Analytics and reporting",
    "Monitor ticket volumes, resolution time, utilization, and performance.",
  ],
];

const roles = [
  ["Super Admin", "Manages organizations and platform-wide operations."],
  ["Organization Admin", "Configures team members, services, and policies."],
  ["Service Manager", "Monitors tickets, workloads, and performance."],
  ["Service Agent", "Handles requests and coordinates assignments."],
  ["Technician", "Accepts work orders and completes service jobs."],
  ["Inventory Team", "Manages parts, replacements, and stock."],
  ["Customer", "Submits requests and tracks service progress."],
];

const steps = [
  "Request submitted",
  "Ticket created",
  "Work accepted",
  "Arrival verified",
  "Repair or replace",
  "Parts supplied",
  "Completion confirmed",
  "Billed and recorded",
];

const stepOwners = [
  "Customer",
  "Service agent",
  "Technician",
  "Technician",
  "Service team",
  "Inventory",
  "Customer",
  "Platform",
];

const stepIcons = [
  ClipboardList,
  TicketCheck,
  Check,
  MapPin,
  Wrench,
  Boxes,
  ShieldCheck,
  ChartNoAxesCombined,
];

const chartHeights = [55, 72, 48, 86, 66, 92, 38];

/* Brand */
function Brand() {
  return (
    <a className="ff-brand" href="#home" aria-label="FieldFlow FSM home">
      <span className="ff-brand-mark">
        <Wrench size={19} />
      </span>
      <span>
        FieldFlow <em>FSM</em>
      </span>
    </a>
  );
}

/* HERO: Moving icons with dotted routes */
function FSMAnimatedBackground() {
  return (
    <div className="ff-motion-bg" aria-hidden="true">
      <div className="ff-flight ff-flight-one">
        {[Wrench, MapPin, ClipboardCheck, PackageCheck].map((Icon, i) => (
          <span className="ff-motion-icon" key={i}>
            <Icon size={20} />
          </span>
        ))}
      </div>

      <div className="ff-flight ff-flight-two">
        {[MapPin, Boxes, Wrench, TicketCheck].map((Icon, i) => (
          <span className="ff-motion-icon" key={i}>
            <Icon size={20} />
          </span>
        ))}
      </div>

      <div className="ff-flight ff-flight-three">
        {[ClipboardList, MapPin, ShieldCheck].map((Icon, i) => (
          <span className="ff-motion-icon" key={i}>
            <Icon size={20} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Reusable animated background for other sections */
function SectionAnimatedBackground({ type, icons: iconsList }) {
  return (
    <div
      className={`ff-section-motion ff-footer-motion ff-${type}-motion`}
      aria-hidden="true"
    >
      {iconsList.map((Icon, index) => (
        <span key={index}>
          <Icon size={24} />
        </span>
      ))}
    </div>
  );
}

/* Premium flowing wave lines inspired by the reference design */
function FlowingWaveBackground() {
  return (
    <div className="ff-wave-field" aria-hidden="true">
      <svg viewBox="0 0 1440 520" preserveAspectRatio="none">
        {Array.from({ length: 9 }, (_, index) => (
          <path
            key={index}
            className="ff-wave-line"
            style={{ "--wave-index": index }}
            d={`M -80 ${340 + index * 8} C 130 ${320 - index * 8}, 110 ${40 + index * 7}, 360 ${160 + index * 7} S 560 ${510 - index * 7}, 730 ${285 + index * 6} S 1000 ${40 + index * 8}, 1160 ${180 + index * 7} S 1320 ${420 - index * 6}, 1520 ${260 + index * 6}`}
          />
        ))}
      </svg>
    </div>
  );
}

/* Dashboard preview */
function DashboardPreview() {
  return (
    <div
      className="ff-preview"
      role="img"
      aria-label="Illustrative operations dashboard with sample tickets, technician activity, and inventory data"
    >
      <div className="ff-preview-top">
        <span className="ff-dots">
          <i />
          <i />
          <i />
        </span>
        <span>Service Operations · Today</span>
        <span className="ff-live">● Live</span>
      </div>

      <div className="ff-preview-content">
        <div className="ff-kpis">
          <div>
            <small>Active tickets</small>
            <strong>128</strong>
            <span>+12 today</span>
          </div>
          <div>
            <small>Technicians</small>
            <strong>34</strong>
            <span>available</span>
          </div>
          <div>
            <small>In progress</small>
            <strong>47</strong>
            <span>work orders</span>
          </div>
          <div>
            <small>Low stock</small>
            <strong>06</strong>
            <span className="ff-warning">parts alert</span>
          </div>
        </div>

        <div className="ff-preview-grid">
          <section className="ff-preview-panel">
            <h3>
              Service activity <small>This week</small>
            </h3>
            <div className="ff-chart">
              {chartHeights.map((height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="ff-week">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </section>

          <section className="ff-preview-panel">
            <h3>Recent tickets</h3>
            <ul className="ff-tickets">
              <li>
                <code>#TK-2041</code>
                <span>Completed</span>
              </li>
              <li>
                <code>#TK-2042</code>
                <span>On site</span>
              </li>
              <li>
                <code>#TK-2043</code>
                <span>Parts req.</span>
              </li>
              <li>
                <code>#TK-2044</code>
                <span>Assigned</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ADDED: Round-robin 3D spotlight.
   Highlights one child at a time, in order, forever.
   Pauses while the mouse is over the group. */
function useRoundRobin(ref, selector, interval = 2200) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const items = Array.from(root.querySelectorAll(selector));
    if (!items.length) return undefined;

    let index = 0;
    let paused = false;

    const tick = () => {
      items.forEach((el, n) =>
        el.classList.toggle("ff-rr-active", n === index),
      );
      index = (index + 1) % items.length;
    };

    const clear = () =>
      items.forEach((el) => el.classList.remove("ff-rr-active"));
    const pause = () => {
      paused = true;
      clear();
    };
    const resume = () => {
      paused = false;
    };

    tick();
    const timer = setInterval(() => {
      if (!paused) tick();
    }, interval);
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(timer);
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("mouseleave", resume);
      clear();
    };
  }, [ref, selector, interval]);
}

const enquiryTypes = ["Request a demo", "Pricing & plans", "Technical support", "Partnership", "Other"];
const products = [
  "Ticket Management", "Technician App", "Inventory",
  "Warranty Claims", "Billing", "Analytics & Reports",
];

const Social = ({ label, d }) => (
  <button type="button" aria-label={label} className="ff-cf-social-link">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
  </button>
);

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", org: "", type: "", message: "", consent: false, products: [],
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggleProduct = (p) =>
    setForm({
      ...form,
      products: form.products.includes(p) ? form.products.filter((x) => x !== p) : [...form.products, p],
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: send `form` to your API, e.g. await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    setSent(true);
    setForm({ name: "", email: "", phone: "", org: "", type: "", message: "", consent: false, products: [] });
  };

  return (
    <section className="ff-contact" id="contact">
      <SectionAnimatedBackground type="contact" icons={[Mail, Smartphone, Headset]} />
      <div className="ff-container ff-cf-grid">
        {/* LEFT: contact info */}
        <div className="ff-cf-info" data-reveal>
          <span className="ff-eyebrow">Contact Info</span>
          <h2>Reach Us <span>Anytime</span></h2>
          <p>Our team of field service experts is ready to help you find the right solution for your specific needs.</p>

          <div className="ff-cf-cards">
            <div className="ff-cf-card ff-cf-navy">
              <i><MapPin size={18} /></i>
              <div><h3>Head Office</h3><p>Plot No. 42, Cyber Towers,<br />HITEC City, Hyderabad,<br />Telangana – 500081, India</p></div>
            </div>
            <div className="ff-cf-card ff-cf-teal">
              <i><Smartphone size={18} /></i>
              <div><h3>Phone &amp; WhatsApp</h3><p><strong>+91 98765 43210</strong><br />Mon–Sat, 9 AM – 7 PM IST</p></div>
            </div>
            <a className="ff-cf-card ff-cf-blue" href="mailto:hello@fieldflow.example">
              <i><Mail size={18} /></i>
              <div><h3>Email</h3><p>hello@fieldflow.example<br />sales@fieldflow.example</p></div>
            </a>
          </div>

          <div className="ff-cf-follow">Follow Us</div>
          <div className="ff-cf-social">
            <Social label="Facebook" d="M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.600V4.400C16.300 4.400 15.400 4.300 14.400 4.300c-2.200 0-3.700 1.300-3.700 3.800v2.400H8.200v3h2.500V21z" />
            <Social label="X" d="M17.800 3h3l-6.500 7.500L22 21h-6l-4.700-6.100L5.900 21h-3l7-8L2.500 3h6.100l4.300 5.600zm-1 16.200h1.700L7.700 4.700H5.900z" />
            <Social label="Instagram" d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zm5 2.500a4.500 4.500 0 110 9 4.500 4.500 0 010-9zm0 2a2.500 2.500 0 100 5 2.500 2.500 0 000-5zM17.200 6a1 1 0 110 2 1 1 0 010-2z" />
            <Social label="LinkedIn" d="M4.500 8.500h3.800V20H4.500zM6.400 3a2.200 2.200 0 110 4.400 2.200 2.200 0 010-4.400zM10.500 8.500h3.600v1.600c.5-1 1.800-1.900 3.700-1.900 3.800 0 4.500 2.500 4.500 5.800V20h-3.800v-5.300c0-1.300 0-2.900-1.800-2.900s-2 1.400-2 2.800V20h-3.800z" />
          </div>
        </div>

        {/* RIGHT: form */}
        <form className="ff-cf-form" onSubmit={onSubmit} data-reveal style={{ "--reveal-delay": "120ms" }}>
          <h3>Send Us a Message</h3>
          <p className="ff-cf-sub">Fill the form below and our team will respond within 24 hours.</p>

          {sent && (
            <div className="ff-cf-success" role="status">
              <span><Check size={16} /></span>
              <div><strong>Message Sent Successfully!</strong><small>We’ll get back to you within 24 hours.</small></div>
            </div>
          )}

          <div className="ff-cf-row">
            <div><label>Full Name <em>*</em></label><input required value={form.name} onChange={set("name")} placeholder="Your full name" /></div>
            <div><label>Email Address <em>*</em></label><input required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" /></div>
          </div>
          <div className="ff-cf-row">
            <div><label>Phone Number</label><input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" /></div>
            <div><label>Organization</label><input value={form.org} onChange={set("org")} placeholder="Your company / organization" /></div>
          </div>

          <label>Enquiry Type <em>*</em></label>
          <select required value={form.type} onChange={set("type")}>
            <option value="">Select enquiry type</option>
            {enquiryTypes.map((t) => <option key={t}>{t}</option>)}
          </select>

          <label>Product of Interest</label>
          <div className="ff-cf-checks">
            {products.map((p) => (
              <label key={p}><input type="checkbox" checked={form.products.includes(p)} onChange={() => toggleProduct(p)} /> {p}</label>
            ))}
          </div>

          <label>Message <em>*</em></label>
          <textarea required rows={4} value={form.message} onChange={set("message")} placeholder="Tell us about your field service needs, team size, and any specific requirements…" />

          <label className="ff-cf-consent">
            <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
            <span>I agree to the <a href="#privacy">Privacy Policy</a> and consent to FieldFlow FSM contacting me regarding my enquiry.</span>
          </label>

          <button type="submit" className="ff-button ff-solid ff-cf-submit">Send Message — Let’s Connect <ArrowRight size={16} /></button>
        </form>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const pageRef = useRef(null);

  /* ADDED: refs + round-robin hooks for the three circled areas */
  const flowRef = useRef(null);
  const featureRef = useRef(null);
  const roleRef = useRef(null);

  useRoundRobin(flowRef, ":scope > span", 1800);
  useRoundRobin(featureRef, ".ff-feature", 2200);
  useRoundRobin(roleRef, ".ff-role", 1800);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return undefined;

    const reveal = (el) => el.classList.add("ff-reveal-in");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      nodes.forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -12% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ff-page" ref={pageRef}>
      <a className="ff-skip" href="#main">
        Skip to content
      </a>

      <header className="ff-header">
        <div className="ff-container ff-nav">
          <Brand />

          <input
            id="ff-menu-toggle"
            className="ff-menu-toggle"
            type="checkbox"
            aria-label="Toggle navigation"
          />

          <label
            className="ff-menu-button"
            htmlFor="ff-menu-toggle"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </label>

          <nav className="ff-menu" aria-label="Main navigation">
            <div className="ff-links">
              <a href="#home">Home</a>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#solutions">Solutions</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="ff-actions">
              <a className="ff-button ff-outline" href="#login">
                Login
              </a>
              <a className="ff-button ff-solid" href="#contact">
                Sign up
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* HERO: Existing moving route animation */}
        <section className="ff-hero" id="home">
          <FSMAnimatedBackground />
          <FlowingWaveBackground />

          <div className="ff-container ff-hero-grid">
            <div className="ff-hero-copy">
              <span className="ff-eyebrow">
                <i /> Multi-tenant field service platform
              </span>
              <h1>
                Manage Every Service.
                <br />
                <span>Empower Every Team.</span>
              </h1>
              <p>
                From customer requests and technician dispatch to inventory,
                warranty, and billing, manage your entire field service
                operation through one connected platform.
              </p>
              <div className="ff-hero-actions">
                <a className="ff-button ff-outline" href="#features">
                  Explore features
                </a>
                <a className="ff-button ff-solid" href="#login">
                  Get started <ArrowRight size={16} />
                </a>
              </div>
              <ul className="ff-points">
                <li>
                  <Check size={14} /> OTP-verified visits
                </li>
                <li>
                  <Check size={14} /> Warranty-aware billing
                </li>
                <li>
                  <Check size={14} /> Role-based workspaces
                </li>
              </ul>
            </div>

            <div>
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* ABOUT: Floating team icons */}
        <section className="ff-about" id="about">
          <SectionAnimatedBackground
            type="about"
            icons={[Users, Headset, Wrench, Boxes]}
          />
          <div className="ff-container ff-about-grid">
            <div data-reveal>
              <span className="ff-eyebrow">Platform overview</span>
              <h2>Everything your service operation needs</h2>
              <p>
                FieldFlow connects customers, service teams, technicians, and
                inventory operations in one place, so every organization runs
                service from a single, organized workspace.
              </p>
              <p>
                Requests move from submission to ticket creation and technician
                assignment, through verified arrival, repair or replacement, and
                confirmed completion, with warranty rules and charges applied
                along the way.
              </p>
            </div>
            {/* CHANGED: added ref={flowRef} */}
            <div
              className="ff-flow"
              ref={flowRef}
              data-reveal
              style={{ "--reveal-delay": "120ms" }}
            >
              <span>
                <Users size={18} /> Customers
              </span>
              <span>
                <Headset size={18} /> Service teams
              </span>
              <span>
                <Wrench size={18} /> Technicians
              </span>
              <span>
                <Boxes size={18} /> Inventory
              </span>
            </div>
          </div>
        </section>

        {/* FEATURES: Rotating icons */}
        <section className="ff-section ff-soft" id="features">
          <SectionAnimatedBackground
            type="features"
            icons={[TicketCheck, Clock3, ShieldCheck, ChartNoAxesCombined]}
          />
          <div className="ff-container">
            <div className="ff-heading" data-reveal>
              <span className="ff-eyebrow">Features</span>
              <h2>Powerful features. Seamless operations.</h2>
              <p>
                The core tools every service organization needs, working
                together.
              </p>
            </div>
            {/* CHANGED: added ref={featureRef} */}
            <div className="ff-feature-grid" ref={featureRef}>
              {features.map(([Icon, title, text], index) => (
                <article
                  className="ff-feature"
                  key={title}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <span>
                    <Icon size={19} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS: Connected workflow timeline */}
        <section className="ff-section" id="how-it-works">
          <SectionAnimatedBackground
            type="steps"
            icons={[ClipboardList, MapPin, Wrench, Check]}
          />
          <div className="ff-container">
            <div className="ff-heading" data-reveal>
              <span className="ff-eyebrow">How it works</span>
              <h2>From service request to successful resolution</h2>
              <p>
                Follow each job as it moves through one connected service
                workflow.
              </p>
            </div>
            <div className="ff-workflow ff-circular-process">
              <div className="ff-workflow-bar">
                <span className="ff-workflow-label">
                  <i /> Workflow preview
                </span>
                <span className="ff-workflow-count">8 connected stages</span>
              </div>
              <ol className="ff-steps" aria-label="Service request workflow">
                {steps.map((step, index) => {
                  const Icon = stepIcons[index];

                  return (
                    <li
                      key={step}
                      data-reveal
                      style={{ "--reveal-delay": `${index * 70}ms` }}
                    >
                      <span className="ff-step-node" aria-hidden="true">
                        <Icon size={17} />
                      </span>
                      <small>
                        <span>STEP {String(index + 1).padStart(2, "0")}</span>
                        {stepOwners[index]}
                      </small>
                      <strong>{step}</strong>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* SOLUTIONS: Floating role icons */}
        <section className="ff-section ff-soft" id="solutions">
          <SectionAnimatedBackground
            type="solutions"
            icons={[ShieldCheck, Users, Smartphone, Headset]}
          />
          <div className="ff-container">
            <div className="ff-heading" data-reveal>
              <span className="ff-eyebrow">Solutions</span>
              <h2>Designed for every role in field service</h2>
              <p>Each person gets tools that match their responsibilities.</p>
            </div>
            {/* CHANGED: added ref={roleRef} */}
            <div className="ff-role-grid" ref={roleRef}>
              {roles.map(([name, description], index) => (
                <article
                  className="ff-role"
                  key={name}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <br />
            <p className="ff-note" data-reveal>
              <ShieldCheck size={18} />
              <span>
                <strong>External customers welcome.</strong> Guest requests can
                be submitted through the public portal. Staff accounts and
                permissions are provisioned by each organization’s
                administrator.
              </span>
            </p>
          </div>
        </section>

        {/* BENEFITS: Orbit-style icons */}
        <section className="ff-section ff-benefits-section">
          <SectionAnimatedBackground
            type="benefits"
            icons={[PackageCheck, MapPin, ChartNoAxesCombined, ClipboardCheck]}
          />
          <div className="ff-container">
            <div className="ff-heading" data-reveal>
              <span className="ff-eyebrow">Benefits</span>
              <h2>One platform. Better service operations.</h2>
            </div>
            <div className="ff-benefits">
              <div data-reveal>
                <ClipboardList />
                <h3>Centralized management</h3>
                <p>Requests, tickets, and records in one shared system.</p>
              </div>
              <div data-reveal style={{ "--reveal-delay": "80ms" }}>
                <MapPin />
                <h3>Technician visibility</h3>
                <p>See who is available, clocked in, and assigned.</p>
              </div>
              <div data-reveal style={{ "--reveal-delay": "160ms" }}>
                <PackageCheck />
                <h3>Inventory and warranty</h3>
                <p>Keep parts, replacements, and warranty status in sync.</p>
              </div>
              <div data-reveal style={{ "--reveal-delay": "240ms" }}>
                <ChartNoAxesCombined />
                <h3>Clearer reporting</h3>
                <p>Make decisions with timely operational reports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ff-cta">
          <div className="ff-container ff-cta-inner" data-reveal>
            <div>
              <span className="ff-eyebrow">FieldFlow FSM</span>
              <h2>Ready to simplify your service operations?</h2>
              <p>
                Bring requests, technicians, inventory, and customer workflows
                together.
              </p>
            </div>
            <a className="ff-button ff-light" href="#login">
              Open demo workspace <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>

          <footer className="ff-footer">
            <div className="ff-container ff-footer-inner">
              <div className="ff-footer-top">
                <div className="ff-footer-brand">
                  <Brand />
                  <p>
                    One connected platform for requests, technicians, inventory,
                    warranty, and billing.
                  </p>
                </div>

                <div className="ff-footer-nav">
                  <h3>Quick Links</h3>
                  <a href="#home">Home</a>
                  <a href="#about">About Us</a>
                  <a href="#features">Features</a>
                  <a href="#how-it-works">How It Works</a>
                </div>

                <div className="ff-footer-nav">
                  <h3>Solutions</h3>
                  <a href="#solutions">For Every Role</a>
                  <a href="#features">Ticket Management</a>
                  <a href="#features">Inventory Management</a>
                  <a href="#features">Analytics &amp; Reporting</a>
                </div>

            <div className="ff-footer-nav">
              <h3>Get in Touch</h3>
              <a href="#contact">Contact Us</a>
              <a href="mailto:hello@fieldflow.example">Email Support</a>
              <a href="#login">Login</a>
              <a href="#contact">Get Started</a>
            </div>
          </div>

          <div className="ff-footer-bottom">
            <span>© 2026 FieldFlow FSM. All rights reserved.</span>
            <div>
              <a href="#home">FieldFlow FSM</a>
              <a href="#contact">Contact</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}