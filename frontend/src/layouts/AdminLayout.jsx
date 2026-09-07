import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
  BookOpenIcon,
  LayersIcon,
  GraduationCapIcon,
  VideoIcon,
  PlayCircleIcon,
  FileTextIcon,
  HelpCircleIcon,
  BarChartIcon,
  MegaphoneIcon,
  SettingsIcon,
  ActivityIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  SearchIcon,
  SparklesIcon
} from "../components/Icons";
import { adminProfile, adminStats } from "../data/adminData";

export default function AdminLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const navSections = [
    {
      heading: "Platform Operations",
      items: [
        { to: "/admin/dashboard", label: "Dashboard", icon: TrendingUpIcon, end: true },
        { to: "/admin/reports", label: "Platform Reports", icon: BarChartIcon },
        { to: "/admin/announcements", label: "Announcements", icon: MegaphoneIcon }
      ]
    },
    {
      heading: "User Governance",
      items: [
        { to: "/admin/students", label: "Students Directory", icon: UsersIcon },
        { to: "/admin/teachers", label: "Faculty & Teachers", icon: AwardIcon, badge: `${adminStats.pendingTeacherApprovals} Pending` },
        { to: "/admin/enrollments", label: "Enrollment Ledger", icon: BookOpenIcon }
      ]
    },
    {
      heading: "Curricula & Degrees",
      items: [
        { to: "/admin/courses", label: "All Curriculums", icon: BookOpenIcon, badge: `${adminStats.pendingCourseApprovals} In Review` },
        { to: "/admin/departments", label: "Departments", icon: LayersIcon },
        { to: "/admin/programs", label: "Degree Programs", icon: GraduationCapIcon }
      ]
    },
    {
      heading: "Instruction & Media",
      items: [
        { to: "/admin/live-classes", label: "Live Broadcasts", icon: VideoIcon, badge: `${adminStats.liveClassesRunning} Live` },
        { to: "/admin/recordings", label: "Recording Archives", icon: PlayCircleIcon },
        { to: "/admin/assignments", label: "Assignments Queue", icon: FileTextIcon },
        { to: "/admin/quizzes", label: "Quiz Catalog", icon: HelpCircleIcon },
        { to: "/admin/gradebook", label: "Global Gradebook", icon: BarChartIcon },
        { to: "/admin/certificates", label: "Certificate Authority", icon: AwardIcon }
      ]
    },
    {
      heading: "Governance & Security",
      items: [
        { to: "/admin/settings", label: "Platform Settings", icon: SettingsIcon },
        { to: "/admin/audit-logs", label: "Security Audit Logs", icon: ActivityIcon },
        { to: "/admin/profile", label: "Administrator Profile", icon: ShieldCheckIcon }
      ]
    }
  ];

  return (
    <div className="admin-lms-layout">
      {/* ADMIN SIDEBAR */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <Link to="/" className="sidebar-brand-link">
            <img src="/images/Logo.png" alt="Learnova" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">Learnova</span>
          </Link>
          <span className="sidebar-portal-badge admin">Admin Console</span>
          <button
            type="button"
            className="btn-close-sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* System Health Chip in Sidebar */}
        <div className="admin-system-health-chip">
          <span className="pulse-green-dot"></span>
          <div>
            <span className="health-title">System Health: 99.99%</span>
            <span className="health-sub">All microservices operational</span>
          </div>
        </div>

        {/* Navigation Section Stack */}
        <div className="admin-nav-sections-scroll">
          {navSections.map((sec, idx) => (
            <div key={idx} className="admin-nav-section-group">
              <span className="admin-nav-section-title">{sec.heading}</span>
              <nav className="admin-nav-menu">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) => `admin-nav-item ${isActive ? "active" : ""}`}
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <Icon size={16} className="admin-nav-icon" />
                      <span className="admin-nav-label">{item.label}</span>
                      {item.badge && <span className="admin-nav-badge">{item.badge}</span>}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer-actions">
          <Link to="/" className="sidebar-public-link">
            ← Public Website
          </Link>
          <button type="button" onClick={handleLogout} className="sidebar-logout-btn">
            <LogOutIcon size={16} />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-top-navbar">
          <div className="top-navbar-left">
            <button
              type="button"
              className="btn-toggle-sidebar"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <MenuIcon size={22} />
            </button>
            <div className="admin-global-search">
              <SearchIcon size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search across students, faculty, courses, audits..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="top-navbar-right">
            <div className="admin-telemetry-badge">
              <span className="telemetry-dot"></span>
              <span>API: {adminStats.apiLatencyMs}ms</span>
            </div>

            {/* Notifications */}
            <div className="notifications-dropdown-wrap">
              <button
                type="button"
                className="btn-notification-trigger"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View admin alerts"
              >
                <BellIcon size={20} />
                <span className="notification-indicator-dot admin"></span>
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown-card">
                  <div className="notif-header">
                    <h4>Admin Audit Alerts (4)</h4>
                    <button type="button" className="btn-clear-notif" onClick={() => setNotificationsOpen(false)}>
                      Close
                    </button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-dot admin"></div>
                      <div>
                        <p><strong>Course In Review:</strong> Autonomous Multi-Agent Systems submitted for audit.</p>
                        <span className="notif-time">10 mins ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-dot admin"></div>
                      <div>
                        <p><strong>Faculty Verification:</strong> Prof. Kenneth Sterling requested instructor credentials.</p>
                        <span className="notif-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-dot admin"></div>
                      <div>
                        <p><strong>Security Sentinel:</strong> Concurrent sessions detected on account Chloe Bennett.</p>
                        <span className="notif-time">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Chip */}
            <Link to="/admin/profile" className="top-admin-profile-chip">
              <img src={adminProfile.avatar} alt={adminProfile.name} className="top-avatar admin-avatar" />
              <div className="top-admin-info-text">
                <span className="top-profile-name">{adminProfile.name}</span>
                <span className="top-profile-role">Root Administrator</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
