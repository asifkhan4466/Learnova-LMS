import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  TrendingUpIcon,
  BookOpenIcon,
  PlusIcon,
  UsersIcon,
  FileTextIcon,
  HelpCircleIcon,
  BarChartIcon,
  VideoIcon,
  PlayCircleIcon,
  AwardIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  BellIcon
} from "../components/Icons";
import { teacherProfile } from "../data/teacherData";

export default function TeacherLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const navItems = [
    { to: "/teacher/dashboard", label: "Dashboard", icon: TrendingUpIcon, end: true },
    { to: "/teacher/courses", label: "My Courses", icon: BookOpenIcon, badge: "4 Live" },
    { to: "/teacher/courses/create", label: "Create Course", icon: PlusIcon },
    { to: "/teacher/students", label: "Enrolled Students", icon: UsersIcon },
    { to: "/teacher/assignments", label: "Assignments & Grading", icon: FileTextIcon, badge: "8 Pending" },
    { to: "/teacher/quizzes", label: "Quiz Manager", icon: HelpCircleIcon },
    { to: "/teacher/gradebook", label: "Class Gradebook", icon: BarChartIcon },
    { to: "/teacher/live-classes", label: "Live Classes", icon: VideoIcon, badge: "2 Live" },
    { to: "/teacher/recordings", label: "Lecture Recordings", icon: PlayCircleIcon },
    { to: "/teacher/profile", label: "Instructor Profile", icon: AwardIcon }
  ];

  return (
    <div className="teacher-lms-layout">
      {/* SIDEBAR NAVIGATION */}
      <aside className={`teacher-sidebar ${mobileSidebarOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-header">
          <Link to="/" className="sidebar-brand-link">
            <img src="/images/Logo.png" alt="Learnova" className="sidebar-logo-img" />
            <span className="sidebar-logo-text">Learnova</span>
          </Link>
          <span className="sidebar-portal-badge teacher">Teacher Studio</span>
          <button
            type="button"
            className="btn-close-sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Teacher Profile Card */}
        <div className="sidebar-teacher-card">
          <img src={teacherProfile.avatar} alt={teacherProfile.name} className="sidebar-avatar teacher-avatar" />
          <div className="sidebar-teacher-info">
            <span className="teacher-card-name">{teacherProfile.name}</span>
            <span className="teacher-card-sub">{teacherProfile.role}</span>
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
                {item.badge && <span className="sidebar-nav-badge teacher">{item.badge}</span>}
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
      <div className="teacher-main-wrapper">
        {/* Top Header */}
        <header className="teacher-top-navbar">
          <div className="top-navbar-left">
            <button
              type="button"
              className="btn-toggle-sidebar"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <MenuIcon size={22} />
            </button>
            <span className="teacher-portal-title">Instructor Studio & Curriculum Management</span>
          </div>

          <div className="top-navbar-right">
            <Link to="/courses" className="btn-top-public-link">
              Course Catalog
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
                <span className="notification-indicator-dot teacher"></span>
              </button>

              {notificationsOpen && (
                <div className="notifications-dropdown-card">
                  <div className="notif-header">
                    <h4>Studio Alerts (3 New)</h4>
                    <button type="button" className="btn-clear-notif" onClick={() => setNotificationsOpen(false)}>
                      Close
                    </button>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-dot teacher"></div>
                      <div>
                        <p><strong>Pending Grading:</strong> Alex Morgan submitted Project 2 (AI Tool-Calling Agent).</p>
                        <span className="notif-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-dot teacher"></div>
                      <div>
                        <p><strong>Live Class Reminder:</strong> Cyclic Deadlocks Masterclass starts tomorrow at 10 AM PST.</p>
                        <span className="notif-time">5 hours ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-dot teacher"></div>
                      <div>
                        <p><strong>High Rating:</strong> New 5-star review received on Next-Gen AI Agents.</p>
                        <span className="notif-time">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Chip */}
            <Link to="/teacher/profile" className="top-teacher-profile-chip">
              <img src={teacherProfile.avatar} alt={teacherProfile.name} className="top-avatar teacher-avatar" />
              <div className="top-teacher-info-text">
                <span className="top-profile-name">{teacherProfile.name}</span>
                <span className="top-profile-role">Instructor</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="teacher-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
