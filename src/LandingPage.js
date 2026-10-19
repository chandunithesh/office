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
import { useEffect, useRef } from "react";
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
    <div className={`ff-section-motion ff-${type}-motion`} aria-hidden="true">
      {iconsList.map((Icon, index) => (
        <span key={index}>
          <Icon size={24} />
        </span>
      ))}
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

export default function LandingPage() {
  const contactGridRef = useRef(null);

  useEffect(() => {
    const grid = contactGridRef.current;
    if (!grid) return;
    const list = grid.querySelector(".ff-contact-list");
    const gridStyle = window.getComputedStyle(grid);
    const listStyle = list ? window.getComputedStyle(list) : null;
    const firstRow = list?.children[0];
    const firstRowStyle = firstRow ? window.getComputedStyle(firstRow) : null;
    // #region agent log
    fetch("http://127.0.0.1:7488/ingest/1fcdcd03-cbe4-4839-846f-6c14e80a1923", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "78f789",
      },
      body: JSON.stringify({
        sessionId: "78f789",
        runId: "pre-verify",
        hypothesisId: "A",
        location: "LandingPage.js:contact-mount",
        message: "Contact section DOM and computed layout",
        data: {
          gridChildCount: grid.children.length,
          gridChildTags: Array.from(grid.children).map(
            (el) => `${el.tagName}.${el.className}`,
          ),
          gridColumns: gridStyle.gridTemplateColumns,
          hasList: Boolean(list),
          listChildCount: list?.children.length ?? 0,
          listChildTags: list
            ? Array.from(list.children).map((el) => el.tagName)
            : [],
          listDisplay: listStyle?.display,
          listFlexDirection: listStyle?.flexDirection,
          firstRowDisplay: firstRowStyle?.display,
          firstRowBorder: firstRowStyle?.border,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  return (
    <div className="ff-page">
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
              <p className="ff-preview-caption">
                Illustrative preview with sample data.
              </p>
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
            <div>
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
            <div className="ff-flow">
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
            <div className="ff-heading">
              <span className="ff-eyebrow">Features</span>
              <h2>Powerful features. Seamless operations.</h2>
              <p>
                The core tools every service organization needs, working
                together.
              </p>
            </div>
            <div className="ff-feature-grid">
              {features.map(([Icon, title, text]) => (
                <article className="ff-feature" key={title}>
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

        {/* HOW IT WORKS: Moving workflow icons */}
        <section className="ff-section" id="how-it-works">
          <SectionAnimatedBackground
            type="steps"
            icons={[ClipboardList, MapPin, Wrench, Check]}
          />
          <div className="ff-container">
            <div className="ff-heading">
              <span className="ff-eyebrow">How it works</span>
              <h2>From service request to successful resolution</h2>
              <p>
                Eight clear steps take each job from request to closed record.
              </p>
            </div>
            <ol className="ff-steps">
              {steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{stepOwners[index]}</small>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SOLUTIONS: Floating role icons */}
        <section className="ff-section ff-soft" id="solutions">
          <SectionAnimatedBackground
            type="solutions"
            icons={[ShieldCheck, Users, Smartphone, Headset]}
          />
          <div className="ff-container">
            <div className="ff-heading">
              <span className="ff-eyebrow">Solutions</span>
              <h2>Designed for every role in field service</h2>
              <p>Each person gets tools that match their responsibilities.</p>
            </div>
            <div className="ff-role-grid">
              {roles.map(([name, description], index) => (
                <article className="ff-role" key={name}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
            <br />
            <p className="ff-note">
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
            <div className="ff-heading">
              <span className="ff-eyebrow">Benefits</span>
              <h2>One platform. Better service operations.</h2>
            </div>
            <div className="ff-benefits">
              <div>
                <ClipboardList />
                <h3>Centralized management</h3>
                <p>Requests, tickets, and records in one shared system.</p>
              </div>
              <div>
                <MapPin />
                <h3>Technician visibility</h3>
                <p>See who is available, clocked in, and assigned.</p>
              </div>
              <div>
                <PackageCheck />
                <h3>Inventory and warranty</h3>
                <p>Keep parts, replacements, and warranty status in sync.</p>
              </div>
              <div>
                <ChartNoAxesCombined />
                <h3>Clearer reporting</h3>
                <p>Make decisions with timely operational reports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ff-cta">
          <div className="ff-container ff-cta-inner">
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

        {/* CONTACT: Floating communication icons */}
        <section className="ff-contact" id="contact">
          <SectionAnimatedBackground
            type="contact"
            icons={[Mail, Smartphone, Headset]}
          />
          <div className="ff-container ff-contact-grid" ref={contactGridRef}>
            <div>
              <span className="ff-eyebrow">Contact</span>
              <h2>Talk to our team</h2>
              <p>
                Questions about bringing your organization onto FieldFlow? Reach
                out.
              </p>
            </div>
            <div className="ff-contact-list">
              <a href="mailto:hello@fieldflow.example">
                <Mail />
                <span>
                  <small>Email</small>
                  <strong>hello@fieldflow.example</strong>
                </span>
              </a>
              <div>
                <Smartphone />
                <span>
                  <small>Phone</small>
                  <strong>+1 (000) 000-0000</strong>
                </span>
              </div>
              <div>
                <Clock3 />
                <span>
                  <small>Support hours</small>
                  <strong>Mon–Fri, 9:00–18:00</strong>
                </span>
              </div>
            </div>
          </div>
        </section>
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
              <a href="#home">Back to top ↑</a>
              <span>Frontend prototype</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
