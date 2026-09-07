import React, { useState } from "react";
import {
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  ClockIcon
} from "../../components/Icons";
import { adminEnrollments } from "../../data/adminData";

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState(adminEnrollments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = enrollments.filter((enr) => {
    const matchesSearch =
      enr.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || enr.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-enrollments-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Global Enrollment Ledger</h1>
          <p className="student-page-subtitle">
            Auditable transaction records of active course registrations, learner completion progression, and tuition payments.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">328,900</span>
          <span className="badge-stat-lbl">Active Platform Enrollments</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="learning-filter-bar">
        <div className="search-filter-wrap">
          <div className="search-input-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select-group">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="studio-filter-select"
            >
              <option value="all">All Progress Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student</th>
              <th>Curriculum</th>
              <th>Enrolled Date</th>
              <th>Pacing / Progress</th>
              <th>Tuition Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><code>{item.id}</code></td>
                <td>
                  <strong>{item.studentName}</strong>
                  <span className="table-sub-detail">{item.studentEmail}</span>
                </td>
                <td><span className="course-ref-text">{item.courseTitle}</span></td>
                <td>{item.enrolledDate}</td>
                <td>
                  <div className="table-progress-cell">
                    <div className="lms-progress-track">
                      <div className="lms-progress-fill" style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <span className="progress-num">{item.progress}%</span>
                  </div>
                </td>
                <td><strong>{item.amountPaid}</strong></td>
                <td>
                  <span
                    className={`status-tag ${
                      item.status === "Completed"
                        ? "published"
                        : item.status === "In Progress"
                        ? "in-review"
                        : "draft"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
