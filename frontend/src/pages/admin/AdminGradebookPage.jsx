import React, { useState } from "react";
import {
  BarChartIcon,
  SearchIcon,
  DownloadIcon,
  CheckCircleIcon,
  AwardIcon
} from "../../components/Icons";
import { adminGradebook } from "../../data/adminData";

export default function AdminGradebookPage() {
  const [grades, setGrades] = useState(adminGradebook);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportBanner, setExportBanner] = useState(false);

  const filtered = grades.filter((g) =>
    g.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    setExportBanner(true);
    setTimeout(() => setExportBanner(false), 2500);
  };

  return (
    <div className="admin-gradebook-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Institution-Wide Academic Gradebook</h1>
          <p className="student-page-subtitle">
            Consolidated academic standing across all accredited faculties, course grade point averages, and honors status.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-secondary" onClick={handleExport}>
            <DownloadIcon size={16} />
            <span>Export Institutional CSV</span>
          </button>
        </div>
      </div>

      {exportBanner && (
        <div className="alert-banner success">
          <CheckCircleIcon size={18} />
          <span>Full institution grade ledger exported to CSV successfully!</span>
        </div>
      )}

      {/* Search */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "340px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search student, course, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table gradebook-table">
          <thead>
            <tr>
              <th>Student Identity</th>
              <th>Curriculum Track</th>
              <th>Faculty Member</th>
              <th>Labs & Projects</th>
              <th>Quizzes Avg</th>
              <th>Cumulative Mark</th>
              <th>Academic Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <strong>{item.studentName}</strong>
                  <span className="table-sub-detail">{item.studentEmail}</span>
                </td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td>{item.teacher}</td>
                <td><span className="grade-cell">{item.assignmentScore}</span></td>
                <td><span className="grade-cell">{item.quizScore}</span></td>
                <td><span className="overall-score-cell">{item.overallGrade}</span></td>
                <td>
                  <span
                    className={`performance-pill ${
                      item.status === "Honors"
                        ? "top"
                        : item.status === "In Good Standing"
                        ? "track"
                        : "attention"
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
