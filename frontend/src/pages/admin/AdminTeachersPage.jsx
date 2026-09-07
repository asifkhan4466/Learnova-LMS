import React, { useState } from "react";
import {
  AwardIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  StarIcon,
  BookOpenIcon,
  MailIcon
} from "../../components/Icons";
import { adminTeachers } from "../../data/adminData";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState(adminTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(false);

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSetVerification = (teacherId, newStatus) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, verificationStatus: newStatus } : t))
    );
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setSelectedTeacher(null);
    }, 1200);
  };

  return (
    <div className="admin-teachers-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Faculty & Instructor Governance</h1>
          <p className="student-page-subtitle">
            Accreditation reviews, instructor credentials vetting, course volume authorization, and revenue audits.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-amber">
            {teachers.filter((t) => t.verificationStatus === "Pending Review").length}
          </span>
          <span className="badge-stat-lbl">Pending Review</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="learning-filter-bar">
        <div className="search-filter-wrap">
          <div className="search-input-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search faculty by name, email, department..."
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
              <option value="all">All Accreditation Statuses</option>
              <option value="Verified">Verified Faculty</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Faculty Member</th>
              <th>Academic Department</th>
              <th>Curricula Authored</th>
              <th>Learner Reach</th>
              <th>Rating</th>
              <th>Verification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <div className="table-user-cell">
                    <img src={t.avatar} alt={t.name} className="table-avatar" />
                    <div>
                      <strong>{t.name}</strong>
                      <span className="table-sub-detail">{t.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="tag-category">{t.department}</span>
                </td>
                <td><strong>{t.coursesCount} Courses</strong></td>
                <td><strong>{t.studentsCount ? t.studentsCount.toLocaleString() : "—"}</strong></td>
                <td>
                  {t.rating > 0 ? (
                    <span className="rating-pill">★ {t.rating}</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td>
                  <span
                    className={`status-tag ${
                      t.verificationStatus === "Verified" ? "published" : "in-review"
                    }`}
                  >
                    {t.verificationStatus}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => setSelectedTeacher(t)}
                  >
                    Manage Authority
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VETTING MODAL */}
      {selectedTeacher && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Faculty Accreditation</span>
                <h2>Review Credentials: {selectedTeacher.name}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedTeacher(null)}
              >
                ✕
              </button>
            </div>

            {actionSuccess ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Accreditation Updated!</h3>
                <p className="text-muted">Faculty authorization status is now synced across all departments.</p>
              </div>
            ) : (
              <div className="quiz-modal-body">
                <div className="recipient-info-box">
                  <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="stu-mini-avatar" />
                  <div>
                    <strong>{selectedTeacher.name}</strong> ({selectedTeacher.email})
                    <p className="text-muted" style={{ margin: 0, fontSize: "12px" }}>
                      Department: {selectedTeacher.department} • Total Earnings: {selectedTeacher.totalEarnings}
                    </p>
                  </div>
                </div>

                <div className="vetting-details-grid" style={{ marginTop: "16px" }}>
                  <div className="vetting-item">
                    <span>Current Status:</span>
                    <strong>{selectedTeacher.verificationStatus}</strong>
                  </div>
                  <div className="vetting-item">
                    <span>Curriculums:</span>
                    <strong>{selectedTeacher.coursesCount} Active</strong>
                  </div>
                  <div className="vetting-item">
                    <span>Identity Verification:</span>
                    <strong className="text-success">Passed (Institutional Email)</strong>
                  </div>
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedTeacher(null)}
                  >
                    Cancel
                  </button>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleSetVerification(selectedTeacher.id, "Pending Review")}
                    >
                      Revoke Verification
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleSetVerification(selectedTeacher.id, "Verified")}
                    >
                      Grant Full Teaching Authority
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
