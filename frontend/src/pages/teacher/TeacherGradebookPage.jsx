import React, { useState } from "react";
import {
  BarChartIcon,
  DownloadIcon,
  CheckCircleIcon,
  SearchIcon,
  AwardIcon,
  FilterIcon
} from "../../components/Icons";
import { teacherGradebook, teacherCourses } from "../../data/teacherData";

export default function TeacherGradebookPage() {
  const [gradebook, setGradebook] = useState(teacherGradebook);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [exportBanner, setExportBanner] = useState(false);

  const filtered = gradebook.filter((item) => {
    const matchesCourse = selectedCourse === "all" || item.course.toLowerCase().includes(selectedCourse.toLowerCase());
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const handleExportCSV = () => {
    setExportBanner(true);
    setTimeout(() => setExportBanner(false), 3000);
  };

  const cohortAverage = Math.round(
    gradebook.reduce((acc, curr) => acc + curr.overall, 0) / gradebook.length
  );

  return (
    <div className="teacher-gradebook-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Class Academic Gradebook</h1>
          <p className="student-page-subtitle">
            Consolidated ledger of assignment scores, quiz evaluations, weighted cumulative grades, and academic standing.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-secondary" onClick={handleExportCSV}>
            <DownloadIcon size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {exportBanner && (
        <div className="alert-banner success">
          <CheckCircleIcon size={20} />
          <span>Gradebook exported to CSV successfully! Download complete.</span>
        </div>
      )}

      {/* High-Level Gradebook Metrics */}
      <div className="progress-overview-cards" style={{ marginBottom: "24px" }}>
        <div className="progress-stat-tile">
          <div className="stat-tile-icon blue"><AwardIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{cohortAverage}%</div>
            <div className="stat-tile-desc">Cohort Average Grade</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon teal"><CheckCircleIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">94.2%</div>
            <div className="stat-tile-desc">Passing Rate (&gt;70%)</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon amber"><BarChartIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">3 Honors</div>
            <div className="stat-tile-desc">High Distinction Scholars</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="learning-filter-bar">
        <div className="search-filter-wrap">
          <div className="search-input-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Filter by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-select-group">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="studio-filter-select"
            >
              <option value="all">All Courses</option>
              <option value="Next-Gen AI Agents">Next-Gen AI Agents</option>
              <option value="Deep Learning">Deep Learning Transformers</option>
              <option value="Enterprise RAG">Enterprise RAG at Scale</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gradebook Matrix Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table gradebook-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Curriculum</th>
              <th>Project 1 (Lab)</th>
              <th>Project 2 (Agent)</th>
              <th>Module 2 Quiz</th>
              <th>Module 3 Quiz</th>
              <th>Overall Score</th>
              <th>Letter</th>
              <th>Standing</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.studentId}>
                <td>
                  <div className="table-user-cell">
                    <img src={item.avatar} alt={item.name} className="table-avatar" />
                    <strong>{item.name}</strong>
                  </div>
                </td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td><span className="grade-cell">{item.assign1}%</span></td>
                <td><span className="grade-cell">{item.assign2}%</span></td>
                <td><span className="grade-cell">{item.quiz1}%</span></td>
                <td><span className="grade-cell">{item.quiz2}%</span></td>
                <td>
                  <span className="overall-score-cell">{item.overall}%</span>
                </td>
                <td>
                  <span className="letter-grade-pill">{item.letterGrade}</span>
                </td>
                <td>
                  <span className={`performance-pill ${item.status === "Honors" ? "top" : item.status === "Passing" ? "track" : "attention"}`}>
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
