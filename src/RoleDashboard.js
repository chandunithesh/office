import { useState } from "react";

const ROLE_MENUS = {
  SUPER_ADMIN: [
    "Organizations",
    "Platform Configuration",
    "Global Analytics",
    "User Management",
  ],
  ORG_ADMIN: [
    "Organization Users",
    "Services & Products",
    "Inventory Management",
    "Warranty Management",
  ],
  SERVICE_MANAGER: [
    "Service Tickets",
    "Work Orders",
    "Technician Capacity",
    "Organization Analytics",
  ],
  SERVICE_AGENT: [
    "Customer Requests",
    "Create Ticket",
    "Assign Technicians",
    "Follow-ups",
  ],
  TECHNICIAN: [
    "Clock In / Clock Out",
    "My Work Orders",
    "Diagnosis",
    "Parts Requests",
    "Complete Service",
  ],
  INVENTORY_TEAM: [
    "Part Requests",
    "Stock Management",
    "Issue Parts",
    "Inventory Transactions",
  ],
  CUSTOMER: [
    "Browse Products",
    "Raise Service Request",
    "Track Requests",
    "View Charges",
  ],
  PORTAL_CUSTOMER: [
    "Submit Service Request",
    "Track Requests",
    "Charge Information",
  ],
};

const ROLE_TITLES = {
  SUPER_ADMIN: "Super Admin",
  ORG_ADMIN: "Organization Admin",
  SERVICE_MANAGER: "Service Manager",
  SERVICE_AGENT: "Service Agent",
  TECHNICIAN: "Technician",
  INVENTORY_TEAM: "Inventory Team",
  CUSTOMER: "Customer",
  PORTAL_CUSTOMER: "Portal Customer",
};

const ROLE_HOME = {
  SUPER_ADMIN: "Global Analytics",
  ORG_ADMIN: "Organization Users",
  SERVICE_MANAGER: "Service Tickets",
  SERVICE_AGENT: "Customer Requests",
  TECHNICIAN: "My Work Orders",
  INVENTORY_TEAM: "Stock Management",
  CUSTOMER: "Track Requests",
  PORTAL_CUSTOMER: "Track Requests",
};

const ROLE_DEMOS = {
  SUPER_ADMIN: {
    summary: "Platform-wide overview",
    stats: [["Organizations", "24"], ["Active users", "1,284"], ["Requests today", "86"]],
    section: "Partner organizations",
    records: [
      ["LG Electronics", "12 technicians", "Connected"],
      ["Sony Service Network", "8 technicians", "Connected"],
      ["Haier Care", "6 technicians", "Review needed"],
    ],
  },
  ORG_ADMIN: {
    summary: "Organization administration overview",
    stats: [["Team members", "48"], ["Service catalog", "12"], ["Parts tracked", "326"]],
    section: "Organization team",
    records: [
      ["Ravi Kumar", "Technician · Home appliances", "On job"],
      ["Suresh M.", "Technician · Refrigeration", "Available"],
      ["Priya Shah", "Service coordinator", "Active"],
    ],
  },
  SERVICE_MANAGER: {
    summary: "Service delivery and technician capacity",
    stats: [["Open tickets", "18"], ["Technicians active", "6 / 8"], ["SLA at risk", "3"]],
    section: "Current service tickets",
    records: [
      ["SB-2046 · AC not cooling", "Priya Nair · Gachibowli", "Unassigned"],
      ["SB-2048 · Washer not draining", "Ananya Reddy · Madhapur", "In progress"],
      ["SB-2047 · Refrigerator cooling", "Vikram Sharma · Kondapur", "Assigned"],
    ],
  },
  SERVICE_AGENT: {
    summary: "Customer intake and follow-up queue",
    stats: [["New requests", "8"], ["Awaiting customer", "5"], ["Resolved today", "11"]],
    section: "Requests to review",
    records: [
      ["Ananya Reddy", "Washing machine · Not draining", "High priority"],
      ["Vikram Sharma", "Refrigerator · Cooling issue", "Ready to assign"],
      ["Priya Nair", "Air conditioner · Not cooling", "Needs details"],
    ],
  },
  TECHNICIAN: {
    summary: "Today's field schedule and assigned work",
    stats: [["Visits today", "4"], ["In progress", "1"], ["Parts needed", "1"]],
    section: "My work orders",
    records: [
      ["SB-2048 · Washing machine", "Ananya Reddy · Madhapur · 10:30 AM", "In progress"],
      ["SB-2051 · Refrigerator", "Vikram Sharma · Kondapur · 12:00 PM", "Next visit"],
      ["SB-2054 · Air conditioner", "Kiran Rao · Gachibowli · 2:30 PM", "Scheduled"],
    ],
  },
  INVENTORY_TEAM: {
    summary: "Parts, stock levels, and technician requests",
    stats: [["Parts tracked", "326"], ["Low stock", "8"], ["Pending requests", "5"]],
    section: "Parts needing attention",
    records: [
      ["Drain pump · LG washers", "Central warehouse · 2 left", "Low stock"],
      ["Compressor relay · Samsung", "Needed for SB-2047", "Request pending"],
      ["AC capacitor · Voltas", "South warehouse · 4 left", "Reorder"],
    ],
  },
  CUSTOMER: {
    summary: "Your appliances and service activity",
    stats: [["My appliances", "3"], ["Open requests", "1"], ["Next visit", "Today, 10:30 AM"]],
    section: "My service requests",
    records: [
      ["Washing machine · LG", "Not draining water · SB-2048", "Technician assigned"],
      ["Refrigerator · Samsung", "Cooling check · SB-1982", "Completed"],
    ],
  },
  PORTAL_CUSTOMER: {
    summary: "Requests submitted through your service portal",
    stats: [["Submitted requests", "2"], ["Awaiting service", "1"], ["Charges due", "$0.00"]],
    section: "Portal request tracker",
    records: [
      ["SR-2026-00125 · HVAC maintenance", "Main facility · Visit today", "In progress"],
      ["SR-2026-00124 · Electrical inspection", "Warehouse · 14 Oct 2026", "Scheduled"],
    ],
  },
};

export default function RoleDashboard({ user, onLogout }) {
  const role = String(user.role || "").toUpperCase();
  const menus = ROLE_MENUS[role] || [];
  const title = ROLE_TITLES[role] || user.roleLabel || role || "User";
  const demo = ROLE_DEMOS[role];
  const [activePage, setActivePage] = useState(ROLE_HOME[role] || menus[0] || "Overview");

  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <h1>ServiceBridge</h1>
          <p>{title} workspace</p>
        </div>

        <button type="button" onClick={onLogout}>Logout</button>
      </header>

      <main className="role-content">
        <p className="role-label">YOUR WORKSPACE</p>

        <h2>
          Welcome, {user.name || user.username || "User"}
        </h2>

        <p className="role-description">{demo?.summary || `${title} Dashboard`}</p>

        <div className="role-grid">
          {menus.map((menu) => (
            <button
              className="role-card"
              key={menu}
              type="button"
              aria-pressed={activePage === menu}
              onClick={() => setActivePage(menu)}
            >
              <span>{menu}</span>
              <span className="role-arrow">→</span>
            </button>
          ))}
        </div>

        {demo && (
          <section aria-labelledby="role-demo-heading">
            <h3 id="role-demo-heading">{activePage}</h3>
            <p>Sample data for demo purposes.</p>
            <dl>
              {demo.stats.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <h3>{demo.section}</h3>
            <ul>
              {demo.records.map(([name, detail, status]) => (
                <li key={name}>
                  <strong>{name}</strong> — {detail} — <span>{status}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!demo && <p>No sample workspace is configured for this role.</p>}
      </main>
    </div>
  );
}