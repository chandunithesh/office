import "./Login.css";
import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock3,
  ClipboardList, Download, Filter, Headphones, Home, LogOut, MapPin,
  Menu, MoreHorizontal, Plus, Search, Settings, ShieldCheck, SlidersHorizontal,
  Sparkles, Users, Wrench, X, Building2, UserRound, CircleHelp, TrendingUp,
  CircleAlert, FileText, Zap, Smartphone, Laptop, Refrigerator, WashingMachine
} from 'lucide-react';

const DEMO_EMAIL = 'admin@servicebridge.com';
const DEMO_PASSWORD = 'Bridge123!';
const LOGIN_ENABLED = true;
const BYPASS_USER = { name: 'Alex Morgan', role: 'Operations Admin' };

const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  ORG_ADMIN: "Organization Admin",
  SERVICE_MANAGER: "Service Manager",
  SERVICE_AGENT: "Service Agent",
  TECHNICIAN: "Technician",
  INVENTORY_TEAM: "Inventory Team",
  CUSTOMER: "Customer",
  PORTAL_CUSTOMER: "External / Portal Customer",
};

const DEMO_USERS = {
  SUPER_ADMIN: {
    name: "Platform Admin",
    email: "superadmin@servicebridge.com",
    password: "Bridge123!",
    role: "SUPER_ADMIN",
  },
  ORG_ADMIN: {
    name: "Alex Morgan",
    email: "admin@servicebridge.com",
    password: "Bridge123!",
    role: "ORG_ADMIN",
  },
  SERVICE_MANAGER: {
    name: "Service Manager",
    email: "manager@servicebridge.com",
    password: "Bridge123!",
    role: "SERVICE_MANAGER",
  },
  SERVICE_AGENT: {
    name: "Service Agent",
    email: "agent@servicebridge.com",
    password: "Bridge123!",
    role: "SERVICE_AGENT",
  },
  TECHNICIAN: {
    name: "Ravi Kumar",
    email: "technician@servicebridge.com",
    password: "Bridge123!",
    role: "TECHNICIAN",
  },
  INVENTORY_TEAM: {
    name: "Inventory Staff",
    email: "inventory@servicebridge.com",
    password: "Bridge123!",
    role: "INVENTORY_TEAM",
  },
  CUSTOMER: {
    name: "Ananya Reddy",
    email: "customer@servicebridge.com",
    password: "Bridge123!",
    role: "CUSTOMER",
  },
  PORTAL_CUSTOMER: {
    name: "Portal Customer",
    email: "portal@servicebridge.com",
    password: "Bridge123!",
    role: "PORTAL_CUSTOMER",
  },
};

const initialJobs = [
  { id: 'SB-2048', customer: 'Ananya Reddy', appliance: 'Washing machine', brand: 'LG', issue: 'Not draining water', technician: 'Ravi Kumar', initials: 'RK', date: 'Today, 10:30 AM', status: 'In progress', priority: 'High', location: 'Madhapur, Hyderabad', color: 'pink' },
  { id: 'SB-2047', customer: 'Vikram Sharma', appliance: 'Refrigerator', brand: 'Samsung', issue: 'Cooling issue', technician: 'Suresh M.', initials: 'SM', date: 'Today, 11:00 AM', status: 'Assigned', priority: 'Normal', location: 'Kondapur, Hyderabad', color: 'blue' },
  { id: 'SB-2046', customer: 'Priya Nair', appliance: 'Air conditioner', brand: 'Voltas', issue: 'AC not cooling', technician: 'Unassigned', initials: '—', date: 'Today, 11:30 AM', status: 'Awaiting tech', priority: 'High', location: 'Gachibowli, Hyderabad', color: 'purple' },
  { id: 'SB-2045', customer: 'Rahul Verma', appliance: 'Television', brand: 'Sony', issue: 'Screen flickering', technician: 'Mahesh R.', initials: 'MR', date: 'Today, 12:00 PM', status: 'Scheduled', priority: 'Normal', location: 'Jubilee Hills, Hyderabad', color: 'orange' },
  { id: 'SB-2044', customer: 'Kavya Iyer', appliance: 'Refrigerator', brand: 'Haier', issue: 'Excessive noise', technician: 'Naveen P.', initials: 'NP', date: 'Today, 1:00 PM', status: 'Completed', priority: 'Low', location: 'Begumpet, Hyderabad', color: 'green' },
];

const techniciansSeed = [
  { name: 'Ravi Kumar', initials: 'RK', specialty: 'LG · Washing machines', jobs: 4, status: 'On job', area: 'Madhapur', color: 'pink' },
  { name: 'Suresh M.', initials: 'SM', specialty: 'Samsung · Refrigerators', jobs: 3, status: 'Available', area: 'Kondapur', color: 'blue' },
  { name: 'Mahesh R.', initials: 'MR', specialty: 'Sony · TVs & audio', jobs: 5, status: 'On job', area: 'Jubilee Hills', color: 'orange' },
  { name: 'Naveen P.', initials: 'NP', specialty: 'Haier · Home appliances', jobs: 2, status: 'Available', area: 'Begumpet', color: 'green' },
];

const initialActivity = [
  { icon: CheckCircle2, color: 'green', title: 'Job SB-2044 completed', detail: 'Naveen P. · Haier refrigerator', time: '8 min ago' },
  { icon: UserRound, color: 'blue', title: 'Technician assigned', detail: 'SB-2047 assigned to Suresh M.', time: '19 min ago' },
  { icon: ClipboardList, color: 'purple', title: 'New service request', detail: 'SB-2048 · LG washing machine', time: '32 min ago' },
  { icon: Building2, color: 'orange', title: 'Organization connected', detail: 'Sony Service Network is active', time: '1 hr ago' },
];

const navItems = [
  { label: 'Overview', icon: Home },
  { label: 'Service jobs', icon: ClipboardList, count: '12' },
  { label: 'Technicians', icon: Users },
  { label: 'Organizations', icon: Building2 },
  { label: 'Customers', icon: UserRound },
  { label: 'Reports', icon: FileText },
];

function Brand() {
  return <div className="brand"><div className="brand-mark"><Wrench size={21}/></div><div><strong>ServiceBridge<span>.</span></strong><small>FIELD OPERATIONS</small></div></div>;
}

export function Login({ onLogin }) {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    window.setTimeout(() => {
      const account = Object.values(DEMO_USERS).find(user =>
        user.email === email.trim().toLowerCase()
      );
      if (account && password === DEMO_PASSWORD) {
        onLogin({ ...account, roleLabel: ROLE_LABELS[account.role] });
      } else {
        setError('Those demo credentials do not match. Choose an account and use the demo password shown below.');
      }
      setBusy(false);
    }, 350);
  }

  return (
    <div className="login-shell">
      <aside className="login-story">
        <div className="login-brand"><Brand/></div>
        <div className="story-content">
          <div className="eyebrow light"><span className="pulse-dot"/> FIELD SERVICE MANAGEMENT</div>
          <h1>Every service.<br/>Connected.</h1>
          <p>Manage field operations efficiently with a simple, secure, and user-friendly platform. Schedule jobs, track technicians, and monitor service activities in real time.</p>
          <div className="story-highlights">
            <div><span className="highlight-icon"><CalendarDays size={18}/></span><span><b>Smarter scheduling</b><small>Keep every service visit on track.</small></span></div>
            <div><span className="highlight-icon"><MapPin size={18}/></span><span><b>Live field visibility</b><small>Know where each job stands.</small></span></div>
            <div><span className="highlight-icon"><ShieldCheck size={18}/></span><span><b>Trusted service network</b><small>Customers and organizations, connected.</small></span></div>
          </div>
        </div>
        <div className="story-footer"><span>© 2026 ServiceBridge</span><span>One bridge. Better service.</span></div>
      </aside>
      <main className="login-panel">
        <div className="login-topline"><span>Welcome to your workspace</span><span className="secure"><ShieldCheck size={15}/> Secure demo environment</span></div>
        <form className="login-card" onSubmit={submit}>
          <div className="login-icon"><Wrench size={23}/></div>
          <div className="form-eyebrow">OPERATIONS PORTAL</div>
          <h2>Welcome back</h2>
          <p className="form-intro">Sign in to manage service requests and field operations.</p>
          {error && <div className="error-box" role="alert">{error}</div>}
          <label htmlFor="email">Work email</label>
          <div className="input-box"><UserRound size={18}/><input id="email" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <div className="password-label"><label htmlFor="password">Password</label><button type="button" className="text-button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'}</button></div>
          <div className="input-box"><ShieldCheck size={18}/><input id="password" type={showPassword?'text':'password'} autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="inline-eye" type="button" onClick={()=>setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword?'Hide':'Show'}</button></div>
          <button className="primary-btn login-submit" type="submit" disabled={busy}>{busy?'Signing in…':'Sign in to workspace'} <ArrowRight size={18}/></button>
          <div className="demo-credentials"><div className="demo-credentials-head"><Sparkles size={15}/> Demo credentials</div>{Object.values(DEMO_USERS).map(account=><div key={account.email}><span>{ROLE_LABELS[account.role]}</span><b>{account.email}</b></div>)}<div><span>Password</span><b>{DEMO_PASSWORD}</b></div><button type="button" className="fill-demo" onClick={()=>{setEmail(DEMO_EMAIL);setPassword(DEMO_PASSWORD);setError('')}}>Fill sample credentials</button></div>
          <div className="login-terms">By signing in, you agree to the platform's demo terms and privacy policy.</div>
        </form>
        <div className="login-bottom"><span>Need help accessing your account?</span><a href="mailto:support@servicebridge.demo">Contact support</a></div>
      </main>
    </div>
  );
}

function MetricCard({ label, value, change, icon: Icon, tone, foot }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={19}/></span></div><div className="metric-value">{value}</div><div className="metric-foot"><span className="trend"><ArrowUpRight size={14}/>{change}</span><span>{foot}</span></div></div>;
}

function Avatar({ initials, color='blue', small=false }) {
  return <span className={`avatar avatar-${color} ${small?'avatar-small':''}`}>{initials}</span>;
}

function Dashboard({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState('Overview');
  const [jobs, setJobs] = useState(initialJobs);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [showNewJob, setShowNewJob] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [newJob, setNewJob] = useState({ customer: '', appliance: 'Refrigerator', brand: 'LG', issue: '', location: '' });

  useEffect(() => {
    document.title = `ServiceBridge | ${activeNav}`;
  }, [activeNav]);

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const text = `${job.id} ${job.customer} ${job.appliance} ${job.brand} ${job.issue} ${job.technician}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'All statuses' || job.status === statusFilter;
    return matchesQuery && matchesStatus;
  }), [jobs, query, statusFilter]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  }

  function updateStatus(id, status) {
    setJobs(old => old.map(job => job.id === id ? { ...job, status } : job));
    notify(`${id} moved to ${status.toLowerCase()}.`);
  }

  function createJob(e) {
    e.preventDefault();
    if (!newJob.customer.trim() || !newJob.issue.trim()) return;
    const id = `SB-${2049 + jobs.length - initialJobs.length}`;
    const job = {
      id, customer: newJob.customer.trim(), appliance: newJob.appliance, brand: newJob.brand,
      issue: newJob.issue.trim(), technician: 'Unassigned', initials: '—', date: 'Today, 3:00 PM',
      status: 'Awaiting tech', priority: 'Normal', location: newJob.location.trim() || 'Hyderabad', color: 'blue'
    };
    setJobs(old => [job, ...old]);
    setNewJob({ customer: '', appliance: 'Refrigerator', brand: 'LG', issue: '', location: '' });
    setShowNewJob(false);
    setActiveNav('Service jobs');
    notify(`Service job ${id} created.`);
  }

  const sectionTitle = activeNav === 'Overview' ? 'Operations overview' : activeNav;
  const activeCount = jobs.filter(j => ['In progress','Assigned','Scheduled','Awaiting tech'].includes(j.status)).length;

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav?'sidebar-open':''}`}>
      <div className="sidebar-brand"><Brand/><button className="mobile-close" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="main-nav">
        {navItems.map(item => <button key={item.label} className={`nav-item ${activeNav===item.label?'active':''}`} onClick={()=>{setActiveNav(item.label);setMobileNav(false)}}><item.icon size={18}/><span>{item.label}</span>{item.count && <em>{item.count}</em>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="support-card"><div className="support-icon"><Headphones size={17}/></div><b>Need a hand?</b><p>Our support team is ready to help.</p><button onClick={()=>notify('Support request noted for this demo.')}>Contact support <ArrowRight size={14}/></button></div>
        <button className="nav-item" onClick={()=>notify('Settings are demo-only in this version.')}><Settings size={18}/><span>Settings</span></button>
        <div className="sidebar-user"><Avatar initials="AM" color="purple"/><div><b>{user.name}</b><small>{user.role}</small></div><button title="Sign out" onClick={onLogout}><LogOut size={17}/></button></div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" onClick={()=>setMobileNav(true)}><Menu size={20}/></button>
        <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14}/><b>{activeNav}</b></div>
        <div className="topbar-actions">
          <div className="top-search"><Search size={17}/><input aria-label="Search jobs" placeholder="Search anything…" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>
          <div className="notification-wrap"><button className={`icon-button ${notificationsOpen?'selected':''}`} onClick={()=>setNotificationsOpen(v=>!v)} aria-label="Notifications"><Bell size={19}/><i/></button>{notificationsOpen && <div className="notification-popover"><b>Notifications</b><p><span className="notif-dot green-dot"/> SB-2044 was marked completed.</p><p><span className="notif-dot blue-dot"/> New request from Ananya Reddy.</p><p><span className="notif-dot orange-dot"/> 1 job is awaiting a technician.</p></div>}</div>
          <div className="top-user"><Avatar initials="AM" color="purple" small/><div><b>{user.name}</b><small>Admin</small></div><ChevronDown size={15}/></div>
        </div>
      </header>

      <div className="page-content">
        {activeNav === 'Overview' ? <>
          <div className="welcome-row"><div><div className="date-line"><span className="live-dot"/> TUESDAY, OCTOBER 13, 2026 <span className="date-divider">/</span> <span>LIVE OVERVIEW</span></div><h1>Good morning, Alex <span className="wave">✦</span></h1><p>Here's what's happening across your service network today.</p></div><button className="primary-btn" onClick={()=>setShowNewJob(true)}><Plus size={18}/> Create service job</button></div>
          <div className="metric-grid">
            <MetricCard label="Total service jobs" value={jobs.length+247} change="+12.8%" foot="vs last month" icon={ClipboardList} tone="blue"/>
            <MetricCard label="Active jobs" value={activeCount+8} change="+4.6%" foot="vs yesterday" icon={Activity} tone="purple"/>
            <MetricCard label="Technicians online" value="24 / 28" change="+2 today" foot="available in field" icon={Users} tone="green"/>
            <MetricCard label="Avg. resolution time" value="2.4 hrs" change="-18.2%" foot="vs last month" icon={Clock3} tone="orange"/>
          </div>
          <div className="dashboard-grid">
            <section className="panel jobs-panel">
              <div className="panel-heading"><div><h2>Recent service jobs</h2><p>Track and manage your latest service requests.</p></div><button className="link-button" onClick={()=>setActiveNav('Service jobs')}>View all <ArrowRight size={15}/></button></div>
              <div className="table-toolbar"><div className="table-subtitle"><span className="live-dot"/> Live job status</div><label className="filter-select"><Filter size={14}/><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>All statuses</option><option>In progress</option><option>Assigned</option><option>Awaiting tech</option><option>Scheduled</option><option>Completed</option></select><ChevronDown size={13}/></label></div>
              <JobsTable jobs={filteredJobs.slice(0,5)} onStatus={updateStatus}/>
              {filteredJobs.length===0 && <div className="empty-state">No jobs match your search or status filter.</div>}
              <div className="table-footer"><span>Showing <b>{Math.min(filteredJobs.length,5)}</b> of <b>{filteredJobs.length}</b> jobs</span><button onClick={()=>setActiveNav('Service jobs')}>View service queue <ArrowRight size={14}/></button></div>
            </section>
            <section className="panel activity-panel">
              <div className="panel-heading"><div><h2>Live activity</h2><p>Updates from across your network.</p></div><span className="activity-live"><i/> Live</span></div>
              <div className="activity-list">{initialActivity.map((item,i)=><div className="activity-item" key={item.title}><div className={`activity-icon ${item.color}`}><item.icon size={17}/></div><div className="activity-copy"><b>{item.title}</b><p>{item.detail}</p><small>{item.time}</small></div>{i===0&&<span className="activity-new">NEW</span>}</div>)}</div>
              <button className="activity-link" onClick={()=>notify('You are viewing all available demo activity.')}>View all activity <ArrowRight size={15}/></button>
            </section>
          </div>
          <div className="lower-grid">
            <section className="panel tech-panel"><div className="panel-heading"><div><h2>Technician availability</h2><p>Current field team status.</p></div><button className="link-button" onClick={()=>setActiveNav('Technicians')}>All technicians <ArrowRight size={15}/></button></div><div className="technician-list">{techniciansSeed.slice(0,3).map(t=><div className="technician-row" key={t.name}><Avatar initials={t.initials} color={t.color}/><div className="tech-info"><b>{t.name}</b><small>{t.specialty}</small></div><div className="tech-jobs"><b>{t.jobs}</b><small>jobs today</small></div><span className={`status-pill ${t.status==='Available'?'status-available':'status-progress'}`}><i/>{t.status}</span></div>)}</div></section>
            <section className="panel org-panel"><div className="panel-heading"><div><h2>Service organizations</h2><p>Connected partner network.</p></div><button className="link-button" onClick={()=>setActiveNav('Organizations')}>Manage <ArrowRight size={15}/></button></div><div className="org-list"><div className="org-row"><div className="org-logo lg-logo">LG</div><div><b>LG Electronics</b><small>12 technicians · Home appliances</small></div><span className="org-connected"><i/>Connected</span></div><div className="org-row"><div className="org-logo sony-logo">SONY</div><div><b>Sony Service Network</b><small>8 technicians · TVs & audio</small></div><span className="org-connected"><i/>Connected</span></div><div className="org-row"><div className="org-logo haier-logo">Haier</div><div><b>Haier Care</b><small>6 technicians · Home appliances</small></div><span className="org-connected"><i/>Connected</span></div></div></section>
          </div>
        </> : <SectionView activeNav={activeNav} jobs={jobs} setActiveNav={setActiveNav} notify={notify} setShowNewJob={setShowNewJob} onStatus={updateStatus} />}
      </div>
    </main>

    {showNewJob && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setShowNewJob(false)}}><form className="job-modal" onSubmit={createJob}><div className="modal-head"><div><span className="form-eyebrow">SERVICE OPERATIONS</span><h2>Create a service job</h2><p>Register a customer issue and route it to the right partner.</p></div><button type="button" className="icon-button" onClick={()=>setShowNewJob(false)}><X size={18}/></button></div><div className="form-grid"><div className="field full"><label>Customer name *</label><input value={newJob.customer} onChange={e=>setNewJob({...newJob,customer:e.target.value})} placeholder="e.g. Ananya Reddy" required/></div><div className="field"><label>Appliance</label><select value={newJob.appliance} onChange={e=>setNewJob({...newJob,appliance:e.target.value})}><option>Refrigerator</option><option>Washing machine</option><option>Air conditioner</option><option>Television</option><option>Microwave</option></select></div><div className="field"><label>Organization</label><select value={newJob.brand} onChange={e=>setNewJob({...newJob,brand:e.target.value})}><option>LG</option><option>Haier</option><option>Sony</option><option>Samsung</option><option>Voltas</option></select></div><div className="field full"><label>Issue description *</label><input value={newJob.issue} onChange={e=>setNewJob({...newJob,issue:e.target.value})} placeholder="Describe the issue" required/></div><div className="field full"><label>Service location</label><input value={newJob.location} onChange={e=>setNewJob({...newJob,location:e.target.value})} placeholder="Area, city"/></div></div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={()=>setShowNewJob(false)}>Cancel</button><button type="submit" className="primary-btn"><Plus size={17}/> Create job</button></div></form></div>}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>;
}

function JobsTable({ jobs, onStatus }) {
  return <div className="table-scroll"><table className="jobs-table"><thead><tr><th>JOB ID</th><th>CUSTOMER / ISSUE</th><th>ORGANIZATION</th><th>TECHNICIAN</th><th>STATUS</th><th></th></tr></thead><tbody>{jobs.map(job=><tr key={job.id}><td><b className="job-id">{job.id}</b><small>{job.date}</small></td><td><div className="customer-cell"><b>{job.customer}</b><small>{job.appliance} · {job.issue}</small></div></td><td><span className={`brand-tag ${job.brand.toLowerCase()}-tag`}>{job.brand}</span></td><td><div className="assigned-cell"><Avatar initials={job.initials} color={job.color} small/><span>{job.technician}</span></div></td><td><select aria-label={`Update ${job.id} status`} className={`status-select status-${job.status.toLowerCase().replaceAll(' ','-')}`} value={job.status} onChange={e=>onStatus(job.id,e.target.value)}>{['In progress','Assigned','Awaiting tech','Scheduled','Completed'].map(s=><option key={s}>{s}</option>)}</select></td><td><button className="row-more" title={`More options for ${job.id}`} onClick={()=>onStatus(job.id,job.status==='Completed'?'Scheduled':'Completed')}><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>;
}

function SectionView({ activeNav, jobs, setActiveNav, notify, setShowNewJob, onStatus }) {
  if (activeNav === 'Service jobs') return <><div className="section-title-row"><div><div className="date-line">SERVICE OPERATIONS</div><h1>Service jobs</h1><p>Manage requests from intake through resolution.</p></div><button className="primary-btn" onClick={()=>setShowNewJob(true)}><Plus size={18}/> Create service job</button></div><div className="section-metrics"><div className="mini-stat"><span>All jobs</span><b>{jobs.length}</b></div><div className="mini-stat"><span>In progress</span><b>{jobs.filter(j=>j.status==='In progress').length}</b></div><div className="mini-stat"><span>Awaiting technician</span><b>{jobs.filter(j=>j.status==='Awaiting tech').length}</b></div><div className="mini-stat"><span>Completed</span><b>{jobs.filter(j=>j.status==='Completed').length}</b></div></div><section className="panel section-panel"><div className="panel-heading"><div><h2>Service queue</h2><p>Use the status dropdown to update a job in this demo.</p></div><span className="activity-live"><i/> Demo data</span></div><JobsTable jobs={jobs} onStatus={onStatus}/></section></>;
  const content = {
    'Technicians': { icon: Users, eyebrow:'FIELD TEAM', title:'Technicians', desc:'Track field team availability, specialties, and current workload.', cards: techniciansSeed.map((t,i)=>({title:t.name,sub:t.specialty,tag:t.status,meta:`${t.jobs} jobs today`,initials:t.initials,color:t.color})) },
    'Organizations': { icon: Building2, eyebrow:'PARTNER NETWORK', title:'Organizations', desc:'Coordinate service requests with your connected appliance partners.', cards:[{title:'LG Electronics',sub:'Home appliances · 12 technicians',tag:'Connected',meta:'98.4% SLA met',initials:'LG',color:'pink'},{title:'Sony Service Network',sub:'TVs & audio · 8 technicians',tag:'Connected',meta:'96.8% SLA met',initials:'S',color:'blue'},{title:'Haier Care',sub:'Home appliances · 6 technicians',tag:'Connected',meta:'97.1% SLA met',initials:'H',color:'green'},{title:'Samsung Service',sub:'Home appliances · 9 technicians',tag:'Connected',meta:'95.9% SLA met',initials:'SA',color:'purple'}] },
    'Customers': { icon: UserRound, eyebrow:'CUSTOMER DIRECTORY', title:'Customers', desc:'A central view of customers and their service history.', cards:[{title:'Ananya Reddy',sub:'3 service requests · Madhapur',tag:'Active',meta:'Last request today',initials:'AR',color:'pink'},{title:'Vikram Sharma',sub:'2 service requests · Kondapur',tag:'Active',meta:'Last request today',initials:'VS',color:'blue'},{title:'Priya Nair',sub:'1 service request · Gachibowli',tag:'Active',meta:'Awaiting technician',initials:'PN',color:'purple'},{title:'Rahul Verma',sub:'4 service requests · Jubilee Hills',tag:'Active',meta:'Last request yesterday',initials:'RV',color:'orange'}] },
    'Reports': { icon: FileText, eyebrow:'PERFORMANCE INSIGHTS', title:'Reports & analytics', desc:'Monitor service quality, turnaround time, and partner performance.', cards:[{title:'First-time fix rate',sub:'Jobs resolved on first visit',tag:'+5.2%',meta:'Target: 90%',initials:'✓',color:'green'},{title:'Average resolution',sub:'Time from assignment to completion',tag:'2.4 hrs',meta:'18% faster this month',initials:'◷',color:'blue'},{title:'Customer satisfaction',sub:'Based on post-service feedback',tag:'4.8 / 5',meta:'Across 247 rated jobs',initials:'★',color:'orange'},{title:'SLA compliance',sub:'Jobs resolved within target window',tag:'97.6%',meta:'Across partner network',initials:'↗',color:'purple'}] }
  }[activeNav] || { icon: Home, eyebrow:'WORKSPACE', title:activeNav, desc:'Manage your ServiceBridge workspace.', cards:[] };
  const Icon = content.icon;
  return <><div className="section-title-row"><div><div className="date-line">{content.eyebrow}</div><h1>{content.title}</h1><p>{content.desc}</p></div><button className="secondary-btn" onClick={()=>notify(`${activeNav} export is a demo action.`)}><Download size={17}/> Export</button></div><div className="section-card-grid">{content.cards.map(card=><div className="directory-card" key={card.title}><div className="directory-card-top"><Avatar initials={card.initials} color={card.color}/><span className="directory-tag">{card.tag}</span></div><h3>{card.title}</h3><p>{card.sub}</p><div className="directory-card-bottom"><span>{card.meta}</span><button title={`View ${card.title}`} onClick={()=>notify(`${card.title} details opened in demo.`)}><ArrowRight size={16}/></button></div></div>)}</div><section className="panel insight-panel"><div className="insight-icon"><Zap size={19}/></div><div><h3>Keep your operations moving</h3><p>Demo workspace data is sample data. Connect your backend to load real organizations, customers, technician locations, and service records.</p></div><button className="link-button" onClick={()=>setActiveNav('Overview')}>Back to overview <ArrowRight size={15}/></button></section></>;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('servicebridge-demo-user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem('servicebridge-demo-user'); }
    }
    setRestored(true);
  }, []);

  function handleLogin(nextUser) {
    localStorage.setItem('servicebridge-demo-user', JSON.stringify(nextUser));
    setUser(nextUser);
  }

  function handleLogout() {
    localStorage.removeItem('servicebridge-demo-user');
    setUser(null);
  }

  if (!restored) return <div className="loading-screen"><div className="brand-mark"><Wrench size={21}/></div><span>Loading ServiceBridge…</span></div>;
  return user || !LOGIN_ENABLED
    ? <Dashboard user={user || BYPASS_USER} onLogout={handleLogout}/>
    : <Login onLogin={handleLogin}/>;
}
