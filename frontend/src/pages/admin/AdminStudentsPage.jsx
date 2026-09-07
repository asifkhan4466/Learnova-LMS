import React, { useState } from "react";
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  LockIcon,
  MailIcon
} from "../../components/Icons";
import { adminStudents } from "../../data/adminData";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState(adminStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [statusReason, setStatusReason] = useState("");
  const [actionSuccess, setActionSuccess] = useState(false);

  const filtered = students.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || stu.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const newStatus = selectedStudent.status === "Active" ? "Suspended" : "Active";

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === selectedStudent.id) {
          return {
            ...s,
            status: newStatus,
            suspensionReason: newStatus === "Suspended" ? statusReason || "Manual administrative action" : undefined
          };
        }
        return s;
      })
    );

    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setSelectedStudent(null);
      setStatusReason("");
    }, 1200);
  };

  return (
    <div className="admin-students-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Student Directory & Access Governance</h1>
          <p className="student-page-subtitle">
            Search global learner records, view enrollment history, enforce security policies, and manage account statuses.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">{students.filter((s) => s.status === "Active").length}</span>
          <span className="badge-stat-lbl">Active Learners</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="learning-filter-bar">
        <div className="search-filter-wrap">
          <div className="search-input-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, email, or country..."
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
              <option value="all">All Account Statuses</option>
              <option value="Active">Active Accounts</option>
              <option value="Suspended">Suspended Accounts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Learner Profile</th>
              <th>Country</th>
              <th>Enrolled Courses</th>
              <th>Total Invested</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Account Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stu) => (
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
                <td><strong>{stu.enrolledCoursesCount} Courses</strong></td>
                <td><strong>{stu.totalSpent}</strong></td>
                <td>{stu.joinedDate}</td>
                <td>
                  <span className={`status-tag ${stu.status === "Active" ? "published" : "in-review"}`}>
                    {stu.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={`btn btn-sm ${stu.status === "Active" ? "btn-outline-danger" : "btn-secondary"}`}
                    onClick={() => {
                      setSelectedStudent(stu);
                      setStatusReason(stu.suspensionReason || "");
                    }}
                  >
                    {stu.status === "Active" ? "Suspend Account" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTIVATE / SUSPEND MODAL */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Access Governance</span>
                <h2>{selectedStudent.status === "Active" ? "Suspend Student Access" : "Reactivate Student Account"}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>

            {actionSuccess ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Status Successfully Updated!</h3>
                <p className="text-muted">Changes are committed to the security audit trail.</p>
              </div>
            ) : (
              <form onSubmit={handleToggleStatus} className="quiz-modal-body">
                <div className="recipient-info-box">
                  <img src={selectedStudent.avatar} alt={selectedStudent.name} className="stu-mini-avatar" />
                  <div>
                    <strong>{selectedStudent.name}</strong> ({selectedStudent.email})
                    <p className="text-muted" style={{ margin: 0, fontSize: "12px" }}>
                      Current Status: <strong>{selectedStudent.status}</strong> • Joined: {selectedStudent.joinedDate}
                    </p>
                  </div>
                </div>

                {selectedStudent.status === "Active" ? (
                  <div className="form-group full-width" style={{ marginTop: "16px" }}>
                    <label>Reason for Suspension *</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Suspected credential sharing, terms of service violation..."
                      value={statusReason}
                      onChange={(e) => setStatusReason(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="alert-banner success" style={{ marginTop: "16px" }}>
                    <CheckCircleIcon size={18} />
                    <span>Reactivating this account will restore course player access and live lecture streaming permissions.</span>
                  </div>
                )}

                <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedStudent(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn ${selectedStudent.status === "Active" ? "btn-danger" : "btn-primary"}`}
                  >
                    {selectedStudent.status === "Active" ? "Confirm Suspension" : "Confirm Reactivation"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
