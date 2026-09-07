import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheckIcon,
  UsersIcon,
  BookOpenIcon,
  SparklesIcon,
  CheckCircleIcon,
  GlobeIcon
} from "../../components/Icons";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-page-layout">
      {/* Dashboard Top Header */}
      <header className="dashboard-header">
        <div className="container dashboard-header-inner">
          <div className="dashboard-brand-side">
            <Link to="/" className="dashboard-logo-link">
              <img src="/images/Logo.png" alt="Learnova" className="dashboard-logo-img" />
              <span className="dashboard-logo-name">Learnova</span>
            </Link>
            <span className="dashboard-role-tag admin">
              <ShieldCheckIcon size={14} />
              Platform Admin Console
            </span>
          </div>

          <div className="dashboard-user-actions">
            <Link to="/" className="btn-dash-back">Public Site</Link>
            <div className="dashboard-user-profile">
              <div className="admin-avatar-initials">AD</div>
              <div className="user-details">
                <span className="user-name">Root Administrator</span>
                <span className="user-sub">Superuser</span>
              </div>
            </div>
            <button type="button" onClick={handleLogout} className="btn-dash-logout">
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container dashboard-main-content">
        {/* Welcome Banner */}
        <div className="dash-welcome-card admin-theme">
          <div className="dash-welcome-text">
            <span className="dash-pill-label">PLATFORM TELEMETRY & CONTROL</span>
            <h1>Learnova Platform Administration</h1>
            <p>All core microservices, video streaming CDNs, and sandbox compute environments are operating normally.</p>
          </div>
          <div className="dash-health-badge">
            <span className="pulse-dot"></span> System Health: 99.99% Operational
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="dash-stats-grid">
          <div className="dash-stat-box">
            <div className="stat-icon-wrap blue"><UsersIcon size={20} /></div>
            <div>
              <div className="stat-number">150,420</div>
              <div className="stat-name">Total Registered Learners</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap violet"><BookOpenIcon size={20} /></div>
            <div>
              <div className="stat-number">452</div>
              <div className="stat-name">Active Published Courses</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap teal"><GlobeIcon size={20} /></div>
            <div>
              <div className="stat-number">85</div>
              <div className="stat-name">Active Countries</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap amber"><ShieldCheckIcon size={20} /></div>
            <div>
              <div className="stat-number">6</div>
              <div className="stat-name">Pending Creator Audits</div>
            </div>
          </div>
        </div>

        {/* Admin Management Grid */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Administrative Operations</h2>
          </div>

          <div className="admin-operations-grid">
            <div className="admin-op-card">
              <h3>User & Role Management</h3>
              <p>Search, review, and adjust permissions for students, instructors, and moderators.</p>
              <button type="button" className="btn-admin-action" onClick={() => alert("User management module is part of future backend integration.")}>
                Manage Users →
              </button>
            </div>

            <div className="admin-op-card">
              <h3>Curriculum Moderation</h3>
              <p>Review submitted courses, check compliance against Learnova syllabus guidelines, and grant publishing approval.</p>
              <button type="button" className="btn-admin-action" onClick={() => alert("Curriculum moderation pipeline will be connected in next steps.")}>
                Review Submissions (6) →
              </button>
            </div>

            <div className="admin-op-card">
              <h3>Certificate Authority</h3>
              <p>Issue, revoke, and verify cryptographic digital credentials generated for graduating learners.</p>
              <button type="button" className="btn-admin-action" onClick={() => alert("Certificate verification tools ready.")}>
                Manage Credentials →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
