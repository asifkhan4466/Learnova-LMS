import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  AwardIcon,
  BookOpenIcon,
  VideoIcon,
  ActivityIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ClockIcon,
  ArrowRightIcon,
  DollarSignIcon,
  ShieldCheckIcon
} from "../../components/Icons";
import {
  adminStats,
  adminStudents,
  adminTeachers,
  adminCourses,
  adminLiveClasses
} from "../../data/adminData";

export default function AdminDashboardPage() {
  const pendingCourses = adminCourses.filter((c) => c.status === "In Review");
  const pendingTeachers = adminTeachers.filter((t) => t.verificationStatus === "Pending Review");

  return (
    <div className="admin-dashboard-page">
      {/* Platform Telemetry Top Banner */}
      <div className="admin-telemetry-banner">
        <div className="telemetry-left">
          <div className="telemetry-badge-chip">
            <span className="pulse-green-dot"></span>
            <span>SYSTEM TELEMETRY & CLUSTER HEALTH</span>
          </div>
          <h1>Learnova Infrastructure & Platform Command</h1>
          <p className="telemetry-sub">
            All distributed microservices, WebRTC video clusters, and Redis caching nodes are functioning within operational parameters (99.99% uptime).
          </p>
        </div>

        <div className="telemetry-metrics-strip">
          <div className="telemetry-metric-item">
            <span className="telemetry-val">32 ms</span>
            <span className="telemetry-lbl">API P99 Latency</span>
          </div>
          <div className="telemetry-metric-item">
            <span className="telemetry-val">98.4%</span>
            <span className="telemetry-lbl">Edge CDN Hit Ratio</span>
          </div>
          <div className="telemetry-metric-item">
            <span className="telemetry-val">{adminStats.liveClassesRunning} Active</span>
            <span className="telemetry-lbl">Live WebRTC Rooms</span>
          </div>
        </div>
      </div>

      {/* Global Platform KPIs */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card lms-content-card">
          <div className="kpi-icon-wrap emerald">
            <UsersIcon size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-num">{adminStats.totalStudents.toLocaleString()}</span>
            <span className="kpi-lbl">Registered Students</span>
            <span className="kpi-trend">+{adminStats.newStudentsToday} today</span>
          </div>
        </div>

        <div className="admin-kpi-card lms-content-card">
          <div className="kpi-icon-wrap indigo">
            <AwardIcon size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-num">{adminStats.totalTeachers.toLocaleString()}</span>
            <span className="kpi-lbl">Verified Faculty</span>
            <span className="kpi-trend text-amber">{adminStats.pendingTeacherApprovals} pending review</span>
          </div>
        </div>

        <div className="admin-kpi-card lms-content-card">
          <div className="kpi-icon-wrap blue">
            <BookOpenIcon size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-num">{adminStats.totalCourses}</span>
            <span className="kpi-lbl">Published Courses</span>
            <span className="kpi-trend text-amber">{adminStats.pendingCourseApprovals} pending audit</span>
          </div>
        </div>

        <div className="admin-kpi-card lms-content-card">
          <div className="kpi-icon-wrap purple">
            <DollarSignIcon size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-num">${(adminStats.monthlyPlatformRevenue / 1000000).toFixed(2)}M</span>
            <span className="kpi-lbl">Monthly Volume</span>
            <span className="kpi-trend text-emerald">↑ 18.2% vs last month</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Pending Approvals & Live Operations */}
      <div className="admin-two-col-grid">
        {/* Pending Course Audits */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Curriculums Awaiting Moderation</h3>
              <p className="card-subtitle">Courses submitted by instructors requiring syllabus accreditation</p>
            </div>
            <Link to="/admin/courses" className="link-view-all">
              All Courses ({adminCourses.length}) →
            </Link>
          </div>

          <div className="admin-task-list">
            {pendingCourses.map((c) => (
              <div key={c.id} className="admin-approval-item">
                <div className="approval-left">
                  <span className="approval-cat-tag">{c.category}</span>
                  <h4 className="approval-title">{c.title}</h4>
                  <span className="approval-instructor">Instructor: <strong>{c.instructor}</strong></span>
                </div>
                <div className="approval-actions">
                  <Link to="/admin/courses" className="btn btn-sm btn-primary">
                    Review Curriculum
                  </Link>
                </div>
              </div>
            ))}

            {pendingCourses.length === 0 && (
              <p className="text-muted" style={{ padding: "16px 0" }}>No pending course reviews.</p>
            )}
          </div>
        </div>

        {/* Pending Teacher Approvals & Live Oversight */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Faculty Approvals Pending</h3>
              <p className="card-subtitle">New instructor applicants requesting teaching authority</p>
            </div>
            <Link to="/admin/teachers" className="link-view-all">
              Faculty Directory ({adminTeachers.length}) →
            </Link>
          </div>

          <div className="admin-task-list">
            {pendingTeachers.map((t) => (
              <div key={t.id} className="admin-approval-item">
                <div className="approval-teacher-info">
                  <img src={t.avatar} alt={t.name} className="table-avatar" />
                  <div>
                    <h4 className="approval-title">{t.name}</h4>
                    <span className="approval-instructor">{t.department} • {t.email}</span>
                  </div>
                </div>
                <div className="approval-actions">
                  <Link to="/admin/teachers" className="btn btn-sm btn-secondary">
                    Inspect Credentials
                  </Link>
                </div>
              </div>
            ))}

            {pendingTeachers.length === 0 && (
              <p className="text-muted" style={{ padding: "16px 0" }}>All instructor applicants vetted.</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Student Registrations Table */}
      <div className="lms-content-card" style={{ marginTop: "24px" }}>
        <div className="card-header-flex">
          <div>
            <h3>Recent Learner Registrations</h3>
            <p className="card-subtitle">Global enrollments across accredited tracks</p>
          </div>
          <Link to="/admin/students" className="btn btn-sm btn-outline">
            Manage All Students ({adminStats.totalStudents.toLocaleString()})
          </Link>
        </div>

        <div className="studio-table-container">
          <table className="studio-data-table">
            <thead>
              <tr>
                <th>Student Identity</th>
                <th>Country</th>
                <th>Enrolled Tracks</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Account Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminStudents.slice(0, 4).map((stu) => (
                <tr key={stu.id}>
                  <td>
                    <div className="table-user-cell">
                      <img src={stu.avatar} alt={stu.name} className="table-avatar" />
                      <div>
                        <strong>{stu.name}</strong>
                        <span className="table-sub-detail">{stu.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{stu.country}</td>
                  <td><strong>{stu.enrolledCoursesCount} Curricula</strong></td>
                  <td>{stu.totalSpent}</td>
                  <td>{stu.joinedDate}</td>
                  <td>
                    <span className={`status-tag ${stu.status === "Active" ? "published" : "in-review"}`}>
                      {stu.status}
                    </span>
                  </td>
                  <td>
                    <Link to="/admin/students" className="btn btn-sm btn-secondary">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
