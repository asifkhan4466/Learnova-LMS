import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  UsersIcon,
  AwardIcon,
  ClockIcon,
  SparklesIcon,
  CheckCircleIcon
} from "../../components/Icons";

export default function TeacherDashboard() {
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
            <span className="dashboard-role-tag teacher">
              <BookOpenIcon size={14} />
              Instructor Studio
            </span>
          </div>

          <div className="dashboard-user-actions">
            <Link to="/" className="btn-dash-back">Public Site</Link>
            <div className="dashboard-user-profile">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Teacher Profile"
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">Dr. Elena Vance</span>
                <span className="user-sub">Lead AI Instructor</span>
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
        <div className="dash-welcome-card teacher-theme">
          <div className="dash-welcome-text">
            <span className="dash-pill-label">INSTRUCTOR STUDIO</span>
            <h1>Welcome to Instructor Studio, Dr. Vance!</h1>
            <p>Your courses received 482 new enrollments this week with an average rating of 4.92 ★.</p>
          </div>
          <button type="button" className="btn-dash-cta teacher" onClick={() => alert("Course Creator wizard will be enabled in the LMS feature step!")}>
            + Create New Course
          </button>
        </div>

        {/* Instructor Metrics */}
        <div className="dash-stats-grid">
          <div className="dash-stat-box">
            <div className="stat-icon-wrap blue"><UsersIcon size={20} /></div>
            <div>
              <div className="stat-number">48,920</div>
              <div className="stat-name">Active Students</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap amber"><AwardIcon size={20} /></div>
            <div>
              <div className="stat-number">4.9 ★</div>
              <div className="stat-name">Overall Rating</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap violet"><BookOpenIcon size={20} /></div>
            <div>
              <div className="stat-number">4</div>
              <div className="stat-name">Published Courses</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap teal"><SparklesIcon size={20} /></div>
            <div>
              <div className="stat-number">$34,250</div>
              <div className="stat-name">Net Earnings (Month)</div>
            </div>
          </div>
        </div>

        {/* Managed Courses */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Your Authored Curriculums</h2>
            <span className="dash-badge-status">4 Live Courses</span>
          </div>

          <div className="teacher-courses-table-wrap">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Students</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Next-Gen AI Agents & LLM Application Engineering</strong></td>
                  <td>Artificial Intelligence</td>
                  <td>48,920</td>
                  <td>★ 4.9</td>
                  <td><span className="status-badge published">Published</span></td>
                  <td><Link to="/course/ai-agents-engineering" className="btn-table-action">View Course</Link></td>
                </tr>
                <tr>
                  <td><strong>Deep Learning, PyTorch & Transformer Models from Scratch</strong></td>
                  <td>Artificial Intelligence</td>
                  <td>29,400</td>
                  <td>★ 4.9</td>
                  <td><span className="status-badge published">Published</span></td>
                  <td><Link to="/course/deep-learning-nlp-transformers" className="btn-table-action">View Course</Link></td>
                </tr>
                <tr>
                  <td><strong>Autonomous Multi-Agent Systems in Production (2026 Edition)</strong></td>
                  <td>AI Engineering</td>
                  <td>—</td>
                  <td>—</td>
                  <td><span className="status-badge draft">In Review</span></td>
                  <td><button type="button" className="btn-table-action" onClick={() => alert("Draft preview will be available in LMS features.")}>Edit Draft</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
