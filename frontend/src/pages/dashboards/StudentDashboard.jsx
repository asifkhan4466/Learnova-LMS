import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCapIcon,
  BookOpenIcon,
  ClockIcon,
  AwardIcon,
  PlayCircleIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from "../../components/Icons";

export default function StudentDashboard() {
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
            <span className="dashboard-role-tag student">
              <GraduationCapIcon size={14} />
              Student Portal
            </span>
          </div>

          <div className="dashboard-user-actions">
            <Link to="/" className="btn-dash-back">
              Public Site
            </Link>
            <Link to="/courses" className="btn-dash-browse">
              Browse Courses
            </Link>
            <div className="dashboard-user-profile">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Student Profile"
                className="user-avatar"
              />
              <div className="user-details">
                <span className="user-name">Alex Morgan</span>
                <span className="user-sub">Student Member</span>
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
        <div className="dash-welcome-card">
          <div className="dash-welcome-text">
            <span className="dash-pill-label">SPRING 2026 COHORT</span>
            <h1>Welcome back, Alex!</h1>
            <p>You have made great progress this week. Your Next-Gen AI Agents lab is ready for submission.</p>
          </div>
          <Link to="/courses" className="btn-dash-cta">
            Resume Learning <ArrowRightIcon size={16} />
          </Link>
        </div>

        {/* Learning Stats */}
        <div className="dash-stats-grid">
          <div className="dash-stat-box">
            <div className="stat-icon-wrap blue"><BookOpenIcon size={20} /></div>
            <div>
              <div className="stat-number">3</div>
              <div className="stat-name">Enrolled Courses</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap teal"><ClockIcon size={20} /></div>
            <div>
              <div className="stat-number">48.5 hrs</div>
              <div className="stat-name">Learning Time</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap amber"><CheckCircleIcon size={20} /></div>
            <div>
              <div className="stat-number">18 / 24</div>
              <div className="stat-name">Completed Labs</div>
            </div>
          </div>
          <div className="dash-stat-box">
            <div className="stat-icon-wrap violet"><AwardIcon size={20} /></div>
            <div>
              <div className="stat-number">1</div>
              <div className="stat-name">Earned Certificates</div>
            </div>
          </div>
        </div>

        {/* Current Active Courses */}
        <div className="dash-section">
          <div className="dash-section-header">
            <h2>Courses In Progress</h2>
            <Link to="/courses" className="dash-link">View Catalog →</Link>
          </div>

          <div className="in-progress-courses-grid">
            <div className="progress-course-card">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
                alt="AI Agents"
                className="progress-course-img"
              />
              <div className="progress-course-info">
                <span className="course-chip">Artificial Intelligence</span>
                <h3>Next-Gen AI Agents & LLM Application Engineering</h3>
                <p>Module 3: Multi-Agent Orchestration with LangGraph</p>
                
                <div className="progress-bar-wrap">
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: "68%" }}></div>
                  </div>
                  <span className="progress-pct">68% Complete</span>
                </div>

                <Link to="/course/ai-agents-engineering" className="btn-resume-course">
                  <PlayCircleIcon size={16} /> Continue Lesson 14
                </Link>
              </div>
            </div>

            <div className="progress-course-card">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
                alt="Full-Stack React"
                className="progress-course-img"
              />
              <div className="progress-course-info">
                <span className="course-chip">Web Development</span>
                <h3>Modern Full-Stack Web Development with React & Node.js</h3>
                <p>Module 2: Server-Side Development with Node & Express</p>
                
                <div className="progress-bar-wrap">
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: "35%" }}></div>
                  </div>
                  <span className="progress-pct">35% Complete</span>
                </div>

                <Link to="/course/fullstack-mern-mastery" className="btn-resume-course">
                  <PlayCircleIcon size={16} /> Continue Lesson 8
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
