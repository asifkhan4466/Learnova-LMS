import React, { useState } from "react";
import {
  FileTextIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  UsersIcon
} from "../../components/Icons";
import { adminAssignments } from "../../data/adminData";

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState(adminAssignments);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-assignments-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Assignment Moderation & Plagiarism Audits</h1>
          <p className="student-page-subtitle">
            Platform-wide inspection of coding lab projects, submission compliance rates, and automated similarity scans.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">624</span>
          <span className="badge-stat-lbl">Active Curricular Projects</span>
        </div>
      </div>

      {/* Search */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "340px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search assignments by title, instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Curricular Assignment</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Total Submissions</th>
              <th>Pending Grading</th>
              <th>Plagiarism Flags</th>
              <th>Status</th>
              <th>Audit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.title}</strong></td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td>{item.teacher}</td>
                <td><strong>{item.totalSubmissions} Submissions</strong></td>
                <td>
                  <span className={item.pendingGrading > 0 ? "text-amber font-bold" : "text-muted"}>
                    {item.pendingGrading} Unchecked
                  </span>
                </td>
                <td>
                  {item.flaggedPlagiarism > 0 ? (
                    <span className="status-tag in-review">1 Match Flagged</span>
                  ) : (
                    <span className="status-tag published">Clean (0)</span>
                  )}
                </td>
                <td><span className="status-tag published">{item.status}</span></td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert(`Reviewing submission hashes and plagiarism reports for: ${item.title}`)}
                  >
                    Inspect Queue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
