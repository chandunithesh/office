import { useEffect, useState } from "react";
import Header from "./Header.js";
import Home from "./Home.js";
import RaiseRequest from "./RaiseRequest.js";
import MyRequests from "./MyRequests.js";
import { Login as LoginPage } from "./Login.js";
import LandingPage from "./LandingPage.js";
import { INITIAL_REQUESTS, nextRequestId, todayISO } from "./data.js";
import "./shared.css";
import "./App.css";
const SESSION_KEY = "servicedesk-demo-user";

function Placeholder({ title, onNavigate }) {
  return (
    <div className="sd-placeholder">
      <h1>{title}</h1>
      <p className="sd-muted sd-placeholder__message">This page isn't part of the demo yet.</p>
      <button className="sd-btn sd-btn--primary" onClick={() => onNavigate("home")}>Back to home</button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [flash, setFlash] = useState("");
  const [showLogin, setShowLogin] = useState(window.location.hash === "#login");
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });

  useEffect(() => {
    const syncLoginRoute = () => setShowLogin(window.location.hash === "#login");
    window.addEventListener("hashchange", syncLoginRoute);
    return () => window.removeEventListener("hashchange", syncLoginRoute);
  }, []);

  useEffect(() => {
    const isLanding = !user && !showLogin;
    document.body.classList.toggle("ff-landing-active", isLanding);
    document.title = isLanding ? "FieldFlow FSM | Field Service Management" : "ServiceBridge";
    return () => document.body.classList.remove("ff-landing-active");
  }, [user, showLogin]);

  const handleLogin = (authenticatedUser) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setPage("home");
  };

  const navigate = (next) => {
    setPage(next);
    window.scrollTo({ top: 0 });
  };

  const handleSubmit = (values) => {
    const id = nextRequestId(requests);
    setRequests((list) => [
      {
        id,
        title: values.title.trim(),
        organization: values.organization,
        category: values.category,
        location: values.location.trim(),
        status: "Under Review",
        priority: values.priority,
        created: todayISO(),
        scheduled: values.date || null,
        updated: todayISO(),
      },
      ...list,
    ]);
    setFlash(`Request ${id} submitted. We'll keep you updated as it progresses.`);
    navigate("home");
  };

  if (!user) return showLogin ? <LoginPage onLogin={handleLogin} /> : <LandingPage />;

  return (
    <div className="sd">
      <Header page={page} onNavigate={navigate} user={user} onLogout={handleLogout} />

      {page === "home" && (
        <Home requests={requests} flash={flash} onDismissFlash={() => setFlash("")} onNavigate={navigate} />
      )}
      {page === "raise" && <RaiseRequest onNavigate={navigate} onSubmit={handleSubmit} />}
      {page === "requests" && <MyRequests requests={requests} onNavigate={navigate} />}
      {page === "about" && <Placeholder title="About & Contact" onNavigate={navigate} />}
    </div>
  );
}
