import { Wrench, Home, Plus, ClipboardList, Building2, Bell, LogOut } from "lucide-react";
import "./Header.css";

// `key` is the page id used by the router in App.jsx
const NAV = [
  { key: "home", label: "Home", icon: Home },
  { key: "raise", label: "Raise a Request", icon: Plus },
  { key: "requests", label: "My Requests", icon: ClipboardList },
  { key: "about", label: "About & Contact", icon: Building2 },
];

export default function Header({ page, onNavigate, user, onLogout }) {
  return (
    <header className="sd-header">
      <div className="sd-header__inner">
        <button className="sd-brand" onClick={() => onNavigate("home")} aria-label="ServiceDesk home">
          <span className="sd-brand__logo"><Wrench size={18} /></span>
          <span>
            <span className="sd-brand__name">ServiceDesk.</span>
            <span className="sd-brand__sub">CUSTOMER PORTAL · DEMO BRAND</span>
          </span>
        </button>

        <nav className="sd-nav" aria-label="Primary">
          {NAV.map(({ key, label, icon: Icon }) => {
            const active = page === key;
            return (
              <button
                key={key}
                className={`sd-nav__link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => onNavigate(key)}
              >
                <Icon size={14} /> {label}
              </button>
            );
          })}
        </nav>

        <div className="sd-header__right">
          <button className="sd-icon-btn" aria-label="Notifications"><Bell size={16} /></button>
          <span className="sd-divider" />
          <div className="sd-account">
            <span className="sd-avatar">AI</span>
            <span className="sd-account__text">
              <strong>{user?.name || "Customer account"}</strong>
              <small>{user?.role || "Signed in"}</small>
            </span>
          </div>
          <button className="sd-btn sd-btn--ghost sd-btn--auto sd-logout" type="button" onClick={onLogout} aria-label="Sign out" title="Sign out">
            <LogOut size={14} /> <span>Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
