import useSubAdminTheme, { themeColors } from "../utils/useSubAdminTheme";
import { useState } from "react";
import PublicIcon from "../components/PublicIcon";
import useProfile from "../utils/useProfile";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./SubAdminLayout.css";
import "../components/SubAdminPage.css";

import { canAccessSubAdminRoute } from "../utils/adminPermissions";
import usePermissions from "../utils/usePermissions";

const navigation = [
  ["/subadmin/dashboard", "Dashboard", "briefcase"],
  ["/subadmin/students", "Students", "users"],
  ["/subadmin/teachers", "Teachers", "users"],
  ["/subadmin/courses", "Courses", "book"],
  ["/subadmin/categories", "Categories", "database"],
  ["/subadmin/batches", "Batches", "users"],
  ["/subadmin/enrollments", "Enrollments", "check"],
  ["/subadmin/payments", "Payments & Verification", "briefcase"],
  ["/subadmin/live-classes", "Live Classes", "video"],
  ["/subadmin/content", "Course & Content", "book"],
  ["/subadmin/assignments", "Assignments", "design"],
  ["/subadmin/certificates", "Certificates", "award"],
  ["/subadmin/reviews", "Reviews & Ratings", "star"],
  ["/subadmin/notifications", "Notifications", "clock"],
  ["/subadmin/reports", "Reports & Analytics", "chart"],
  ["/subadmin/public-content", "Public Website", "globe"],
  ["/subadmin/permissions", "Permissions", "target"],
  ["/subadmin/audit-logs", "Audit Logs", "clock"],
  ["/subadmin/settings", "Settings", "design"],
  ["/subadmin/profile", "Profile", "users"],
];

function SubAdminLayout() {
 const theme=useSubAdminTheme();
  const savedProfile = useProfile("SA-1001");
  const permissions = usePermissions();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const allowedNavigation = navigation.filter(([path]) => canAccessSubAdminRoute(path, permissions));
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div style={{"--learnova-primary":themeColors[theme],"--sa-accent":themeColors[theme]}} className={`subadmin-layout${collapsed ? " sa-collapsed" : ""}`}>

      <aside className="subadmin-sidebar">

        <div className="subadmin-logo">
          <div className="sa-brand-lockup"><span className="sa-brand-symbol"><img src="/Logo.png" alt="Learnova" /></span><span className="sa-brand-wordmark" aria-hidden="true"><strong>Learnova</strong><small>Learn. Grow. Achieve.</small></span></div><small>Sub Admin Panel</small>
        </div>

        <nav className="subadmin-nav">
          {allowedNavigation.map(([path, label, icon]) => (
            <Link key={path} to={path} className={isActive(path)} title={label} aria-label={label}><PublicIcon name={icon}/><span className="sa-nav-label">{label}</span></Link>
          ))}
        </nav>

        <div className="subadmin-sidebar-bottom">

          <Link to="/subadmin/logout" aria-label="Logout" title="Logout">
            <PublicIcon name="arrow"/><span className="sa-nav-label">Logout</span>
          </Link>

        </div>

      </aside>

      <div className="subadmin-content">

        <header className="subadmin-topbar">

          <button className="sa-menu-toggle" aria-label="Toggle sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}><PublicIcon name="menu"/></button>
          <div className="sa-header-search"><label><PublicIcon name="search"/><input aria-label="Search Sub Admin pages" placeholder="Search pages..." value={search} onChange={event => setSearch(event.target.value)}/></label>{search.trim() && <div className="sa-search-results">{allowedNavigation.filter(([,label]) => label.toLowerCase().includes(search.trim().toLowerCase())).map(([path,label]) => <Link key={path} to={path} onClick={() => setSearch("")}>{label}</Link>)}{!allowedNavigation.some(([,label]) => label.toLowerCase().includes(search.trim().toLowerCase())) && <p>No matching pages.</p>}</div>}</div>
          <Link className="sa-notifications-link" to="/subadmin/notifications" aria-label="Notifications"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></Link>
          <Link className="subadmin-user" to="/subadmin/profile" aria-label="My profile">

            <div className="subadmin-avatar">{savedProfile.image ? <img src={savedProfile.image} alt="My profile"/> : "SA"}</div>

            <div>
              <strong>{savedProfile.name || "Sub Admin"}</strong>
              <span>Sub Administrator</span>
            </div>
            <svg className="sa-profile-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </Link>

        </header>

        <main className="subadmin-main">
          {(location.pathname.replace(/\/+$/, "") === "/subadmin" || canAccessSubAdminRoute(location.pathname, permissions)) ? <Outlet /> : (
            <section role="status">
              <h1>Access unavailable</h1>
              <p>Your Admin has not enabled access to this module.</p>
              <Link to="/subadmin/dashboard">Back to Dashboard</Link>
            </section>
          )}
        </main>
        <footer className="sa-footer"><span>&copy; 2026 Learnova. All rights reserved.</span><nav aria-label="Footer"><span>Privacy</span><span>Terms</span><Link to="/contact">Help</Link></nav></footer>

      </div>

    </div>
  );
}

export default SubAdminLayout;