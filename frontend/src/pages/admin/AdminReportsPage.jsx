import React from "react";
import {
  BarChartIcon,
  TrendingUpIcon,
  UsersIcon,
  BookOpenIcon,
  CheckCircleIcon,
  DownloadIcon
} from "../../components/Icons";
import { adminReports, adminStats } from "../../data/adminData";

export default function AdminReportsPage() {
  const maxLearners = Math.max(...adminReports.monthlyLearnerGrowth.map((m) => m.count));

  return (
    <div className="admin-reports-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Platform Intelligence & Growth Analytics</h1>
          <p className="student-page-subtitle">
            Longitudinal telemetry on learner acquisition velocity, departmental distributions, course completion, and retention.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-secondary" onClick={() => alert("Comprehensive executive report generated.")}>
            <DownloadIcon size={16} />
            <span>Download Annual Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="progress-overview-cards" style={{ marginBottom: "24px" }}>
        <div className="progress-stat-tile">
          <div className="stat-tile-icon blue"><UsersIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{adminReports.completionRates.averageCourseCompletion}</div>
            <div className="stat-tile-desc">Course Completion Rate</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon teal"><CheckCircleIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{adminReports.completionRates.capstoneProjectPassRate}</div>
            <div className="stat-tile-desc">Capstone Project Pass Rate</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon amber"><TrendingUpIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{adminReports.completionRates.retention30Days}</div>
            <div className="stat-tile-desc">30-Day Learner Retention</div>
          </div>
        </div>
      </div>

      {/* Charts Split Grid */}
      <div className="analytics-split-grid">
        {/* Monthly Growth Bar Chart */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Learner Acquisition Growth (6 Months)</h3>
              <p className="card-subtitle">Total cumulative registered students across all faculties</p>
            </div>
            <span className="badge-weekly-total">+52k in 6 Mos</span>
          </div>

          <div className="weekly-chart-wrapper">
            <div className="weekly-bars-container" style={{ height: "200px" }}>
              {adminReports.monthlyLearnerGrowth.map((item) => {
                const heightPct = Math.round((item.count / maxLearners) * 100);
                return (
                  <div key={item.month} className="chart-col">
                    <span className="chart-val-label">{(item.count / 1000).toFixed(0)}k</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill" style={{ height: `${heightPct}%`, background: "linear-gradient(180deg, #10b981 0%, #059669 100%)" }}></div>
                    </div>
                    <span className="chart-day-label">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Department Enrollment Share */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Departmental Enrollment Distribution</h3>
              <p className="card-subtitle">Active learners proportioned by faculty specialization</p>
            </div>
          </div>

          <div className="dept-distribution-stack" style={{ marginTop: "16px" }}>
            {adminReports.departmentDistribution.map((item) => (
              <div key={item.dept} className="distribution-row">
                <div className="dist-labels">
                  <span>{item.dept}</span>
                  <strong>{item.pct}%</strong>
                </div>
                <div className="lms-progress-track">
                  <div className="lms-progress-fill" style={{ width: `${item.pct * 2.2}%`, background: "#6366f1" }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
