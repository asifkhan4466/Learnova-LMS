import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUpIcon,
  BookOpenIcon,
  SparklesIcon,
  AwardIcon,
  FileTextIcon,
  HelpCircleIcon,
  UsersIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  SearchIcon,
  GraduationCapIcon
} from "../components/Icons";
import { studentProfile, studentStats } from "../data/studentData";

export default function StudentLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const navItems = [
    { to: "/student/dashboard", label: "Dashboard", icon: TrendingUpIcon, end: true },
    { to: "/student/my-learning", label: "My Learning", icon: BookOpenIcon },
    { to: "/student/courses", label: "Browse Courses", icon: SparklesIcon },
    { to: "/student/progress", label: "Learning Progress", icon: AwardIcon },
    { to: "/student/assignments", label: "Assignments", icon: FileTextIcon, badge: "1 Pending" },
    { to: "/student/quizzes", label: "Quizzes", icon: HelpCircleIcon },
    { to: "/student/certificates", label: "Certificates", icon: AwardIcon, badge: "1 Earned" },
    { to: "/student/profile", label: "Profile & Settings", icon: UsersIcon }
  ];

  return (
    <div className="student-lms-layout">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`student-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <Link to="/" className="sidebar-brand-link">
            <img src="/images/Logo.png" alt="Learnova" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">Learnova</span>
          </Link>
          <span className="sidebar-portal-badge">Student LMS</span>
          <button
            type="button"
            className="btn-close-sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Student Mini Profile Card in Sidebar */}
        <div className="sidebar-student-card">
          <img src={studentProfile.avatar} alt={studentProfile.name} className="sidebar-avatar" />
          <div className="sidebar-student-info">
            <span className="student-card-name">{studentProfile.name}</span>
            <span className="student-card-dept">{studentProfile.department}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="sidebar-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setMobileSidebarOpen(false)}
              >
                <Icon size={18} className="sidebar-nav-icon" />
                <span className="sidebar-nav-label">{item.label}</span>
                {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer-actions">
          <Link to="/" className="sidebar-public-link">
            ← Back to Public Website
          </Link>
          <button type="button" onClick={handleLogout} className="sidebar-logout-btn">
            <LogOutIcon size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setMobileSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="student-main-wrapper">
        {/* Top LMS Header */}
        <header className="student-top-navbar">
          <div className="top-navbar-left">
            <button
              type="button"
              className="btn-toggle-sidebar"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <MenuIcon size={22} />
            </button>
            <span className="student-portal-title">Student Learning Space</span>
          </div>

          <div className="top-navbar-right">
            {/* Quick Public Site Link */}
            <Link to="/" className="btn-top-public-link">
              Public Portal
            </Link>

            {/* Notifications */}
            <div className="notifications-dropdown-wrap">
              <button
                type="button"
                className="btn-notification-trigger"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="View notifications"
              >
                <BellIcon size={20} />
                <span className="notification-indicator-dot"></span>
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown-card">
                  <div className="notif-header">
                    <h4>Notifications (2 New)</h4>
                    <button type="button" className="btn-clear-notif" onClick={() => setNotificationsOpen(false)}>
                      Close
                    </button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-dot"></div>
                      <div>
                        <p><strong>Assignment Due Soon:</strong> Project 2: Tool-Calling Agent due Sep 12.</p>
                        <span className="notif-time">1 hour ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-dot"></div>
                      <div>
                        <p><strong>Certificate Ready:</strong> Figma to Code System Design certificate is verified.</p>
                        <span className="notif-time">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Top User Profile Chip */}
            <Link to="/student/profile" className="top-student-profile-chip">
              <img src={studentProfile.avatar} alt={studentProfile.name} className="top-avatar" />
              <span className="top-profile-name">{studentProfile.name}</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="student-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
