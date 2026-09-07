import React, { useState } from "react";
import {
  HelpCircleIcon,
  SearchIcon,
  CheckCircleIcon,
  AwardIcon
} from "../../components/Icons";
import { adminQuizzes } from "../../data/adminData";

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState(adminQuizzes);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-quizzes-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Platform Assessment & Quiz Quality Audits</h1>
          <p className="student-page-subtitle">
            Automated quality telemetry on multiple choice assessments, question discrimination indices, and failure anomalies.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">91.4%</span>
          <span className="badge-stat-lbl">Global Pass Rate</span>
        </div>
      </div>

      {/* Search */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "340px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search quizzes by title, instructor..."
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
              <th>Assessment Title</th>
              <th>Associated Curriculum</th>
              <th>Instructor</th>
              <th>Question Bank</th>
              <th>Total Attempts</th>
              <th>Cohort Average</th>
              <th>Pass Rate</th>
              <th>Quality Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.title}</strong></td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td>{item.teacher}</td>
                <td>{item.questionsCount} Questions</td>
                <td>{item.attemptsCount.toLocaleString()}</td>
                <td><strong className="text-emerald">{item.avgScore}</strong></td>
                <td>{item.passRate}</td>
                <td><span className="status-tag published">{item.status}</span></td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert(`Reviewing question telemetry and discrimination metrics for: ${item.title}`)}
                  >
                    Review Metrics
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
