import { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import "./RaiseRequest.css";

const CATEGORIES = ["Maintenance", "Electrical", "HVAC", "Plumbing", "Equipment repair", "Other"];
const ASSETS = ["Not specified", "HVAC unit", "Generator", "Production line", "Other"];
const PRIORITIES = ["Low", "Normal", "High", "Urgent"];
const SLOTS = ["No preference", "Morning (8am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 8pm)"];

const MAX_FILES = 5;
const MAX_MB = 10;
const ORGANIZATIONS_API = "https://techtamminaapps.appiancloud.com/suite/webapi/2BoXHg";
const ORGANIZATIONS_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxZDhmMDEwOS1mYmMyLWUyNGYtOGUyYS1mYzlhYTA2ZGJmMzcifQ.vXwMhvFGKrSwqK-HRM7r65UuZKy15LDrcHqp7LnxDk0";

const EMPTY = {
  title: "",
  category: "Maintenance",
  location: "Main facility",
  asset: "Not specified",
  description: "",
  priority: "Normal",
  date: "",
  slot: "No preference",
};

function Field({ label, required, error, full, children, htmlFor }) {
  return (
    <div className={`sd-field ${full ? "sd-field--full" : ""}`}>
      <label htmlFor={htmlFor}>{label}{required && <i aria-hidden="true">*</i>}</label>
      {children}
      {error && <span className="sd-error" role="alert">{error}</span>}
    </div>
  );
}

export default function RaiseRequest({ onNavigate, onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [organizations, setOrganizations] = useState([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(false);
  const [organizationsError, setOrganizationsError] = useState("");

  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const loadOrganizations = async () => {
    if (!ORGANIZATIONS_API_KEY || ORGANIZATIONS_API_KEY === "PASTE_YOUR_API_KEY_HERE") {
      setOrganizationsError("Add your key to ORGANIZATIONS_API_KEY in RaiseRequest.jsx.");
      return;
    }

    setOrganizationsLoading(true);
    setOrganizationsError("");
    try {
      const response = await fetch(ORGANIZATIONS_API, {
        headers: { "Appian-API-Key": ORGANIZATIONS_API_KEY.trim(), Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(response.status === 401 || response.status === 403
          ? "The API key was rejected. Check the key and try again."
          : `The organization request failed (${response.status}).`);
      }

      const payload = await response.json();
      const lists = [
        Array.isArray(payload) ? payload : null,
        payload?.organizations,
        payload?.data?.organizations,
        payload?.data,
        payload?.items,
        payload?.results,
      ];
      const rows = lists.find(Array.isArray);
      if (!rows) throw new Error("The API response did not contain an organization list.");

      const options = rows.map((item) => {
        if (typeof item === "string") return { value: item, label: item };
        const label = item?.name ?? item?.organizationName ?? item?.displayName ?? item?.label;
        const value = item?.id ?? item?.organizationId ?? item?.value ?? label;
        return label && value ? { value: String(value), label: String(label) } : null;
      }).filter(Boolean);

      if (!options.length) throw new Error("No organizations were found in the API response.");
      setOrganizations(options);
      setForm((current) => ({ ...current, organization: "" }));
    } catch (error) {
      setOrganizations([]);
      setForm((current) => ({ ...current, organization: "" }));
      setOrganizationsError(error instanceof TypeError
        ? "Could not reach the API. Check the network and Appian CORS settings."
        : error.message || "Could not load organizations.");
    } finally {
      setOrganizationsLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    const problems = [];
    if (picked.length > MAX_FILES) problems.push(`Choose up to ${MAX_FILES} files.`);
    if (picked.some((f) => f.size > MAX_MB * 1024 * 1024)) problems.push(`Each file must be under ${MAX_MB} MB.`);

    if (problems.length) {
      e.target.value = "";
      setFiles([]);
      setErrors((x) => ({ ...x, files: problems.join(" ") }));
    } else {
      setFiles(picked);
      setErrors((x) => ({ ...x, files: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "Enter a request title.";
    if (!form.organization) next.organization = "Select an organization.";
    if (!form.location.trim()) next.location = "Enter the service location.";
    if (!form.description.trim()) next.description = "Describe the issue so we can help.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors((x) => ({ files: x.files, ...next }));
    if (Object.keys(next).length) return;
    onSubmit({ ...form, files });
  };

  return (
    <div className="sd-form-page">
      <button className="sd-back" onClick={() => onNavigate("home")}>
        <ArrowLeft size={14} /> Back to home
      </button>

      <div className="sd-form-head">
        <div className="sd-eyebrow">LET'S GET IT SORTED</div>
        <h1>Raise a Service Request</h1>
        <div className="sd-form-sub">
          Tell us what needs attention. <span className="sd-chip">Demo form</span>
        </div>
      </div>

      <form className="sd-form" onSubmit={handleSubmit} noValidate>
        <h2>Service details</h2>

        <div className="sd-grid">
          <Field label="Organization" required htmlFor="organization" error={errors.organization}>
            <select
              id="organization" className={`sd-input ${errors.organization ? "has-error" : ""}`}
              value={form.organization || ""} onChange={set("organization")}
              disabled={!organizations.length || organizationsLoading}
            >
              <option value="">
                {organizationsLoading ? "Loading organizations…" : organizations.length ? "Select an organization" : "Organizations unavailable"}
              </option>
              {organizations.map((organization) => (
                <option key={organization.value} value={organization.value}>{organization.label}</option>
              ))}
            </select>
            {organizationsError && <span className="sd-error" role="alert">{organizationsError}</span>}
          </Field>

          <Field label="Service category" required htmlFor="category">
            <select id="category" className="sd-input" value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Request title" required htmlFor="title" error={errors.title}>
            <input
              id="title" className={`sd-input ${errors.title ? "has-error" : ""}`}
              placeholder="e.g. Air conditioning not cooling"
              value={form.title} onChange={set("title")}
            />
          </Field>

          <Field label="Service location" required htmlFor="location" error={errors.location}>
            <input
              id="location" className={`sd-input ${errors.location ? "has-error" : ""}`}
              value={form.location} onChange={set("location")}
            />
          </Field>

          <Field label="Asset / equipment" htmlFor="asset">
            <select id="asset" className="sd-input" value={form.asset} onChange={set("asset")}>
              {ASSETS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </Field>

          <Field label="Issue description" required full htmlFor="description" error={errors.description}>
            <textarea
              id="description" rows={4}
              className={`sd-input ${errors.description ? "has-error" : ""}`}
              placeholder="Describe the issue and any relevant details…"
              value={form.description} onChange={set("description")}
            />
          </Field>

          <Field label="Priority" required htmlFor="priority">
            <select id="priority" className="sd-input" value={form.priority} onChange={set("priority")}>
              {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>

          <Field label="Preferred service date" htmlFor="date">
            <input id="date" type="date" className="sd-input" value={form.date} onChange={set("date")} />
          </Field>

          <Field label="Preferred time slot" htmlFor="slot">
            <select id="slot" className="sd-input" value={form.slot} onChange={set("slot")}>
              {SLOTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <p className="sd-hint">Preferred dates and times are subject to confirmation.</p>

          <div className="sd-field sd-field--full">
            <span className="sd-label">Attachments <em>(optional)</em></span>
            <div className="sd-drop">
              <div className="sd-drop__text">
                <Upload size={16} /> Photos or documents · Up to {MAX_FILES} files, {MAX_MB} MB each
              </div>
              <input
                type="file" multiple accept="image/*,.pdf,.doc,.docx"
                aria-label="Attachments" onChange={handleFiles}
              />
              {files.length > 0 && (
                <ul className="sd-files">
                  {files.map((f) => <li key={f.name}>{f.name} · {(f.size / 1024 / 1024).toFixed(1)} MB</li>)}
                </ul>
              )}
              {errors.files && <span className="sd-error" role="alert">{errors.files}</span>}
            </div>
          </div>
        </div>

        <div className="sd-form-actions">
          <button type="button" className="sd-btn sd-btn--ghost sd-btn--auto" onClick={() => onNavigate("home")}>
            Cancel
          </button>
          <button type="submit" className="sd-btn sd-btn--primary">Submit request</button>
        </div>
      </form>
    </div>
  );
}
