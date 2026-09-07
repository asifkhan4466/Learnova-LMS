import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  SearchIcon,
  StarIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  EyeIcon
} from "../../components/Icons";
import { adminCourses } from "../../data/adminData";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(adminCourses);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(false);

  const filtered = courses.filter((c) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "published" && c.status === "Published") ||
      (activeTab === "in-review" && c.status === "In Review");
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateCourseStatus = (courseId, newStatus) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: newStatus } : c))
    );
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setSelectedCourse(null);
    }, 1200);
  };

  return (
    <div className="admin-courses-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Global Course Catalog & Moderation</h1>
          <p className="student-page-subtitle">
            Inspect all instructor submissions, verify syllabus compliance, approve public catalog listings, and monitor revenue.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-amber">
            {courses.filter((c) => c.status === "In Review").length}
          </span>
          <span className="badge-stat-lbl">Pending Review</span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Curriculums ({courses.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            Published ({courses.filter((c) => c.status === "Published").length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "in-review" ? "active" : ""}`}
            onClick={() => setActiveTab("in-review")}
          >
            In Review ({courses.filter((c) => c.status === "In Review").length})
          </button>
        </div>

        <div className="search-input-box" style={{ maxWidth: "340px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by course, instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Curriculum</th>
              <th>Category</th>
              <th>Faculty Instructor</th>
              <th>Enrolled</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((course) => (
              <tr key={course.id}>
                <td>
                  <div>
                    <strong>{course.title}</strong>
                    <span className="table-sub-detail">{course.modulesCount} Modules • Submitted {course.submittedDate}</span>
                  </div>
                </td>
                <td><span className="tag-category">{course.category}</span></td>
                <td>
                  <strong>{course.instructor}</strong>
                  <span className="table-sub-detail">{course.instructorEmail}</span>
                </td>
                <td><strong>{course.studentsCount ? course.studentsCount.toLocaleString() : "—"}</strong></td>
                <td><strong>${course.price}</strong></td>
                <td>
                  <span className={`status-tag ${course.status === "Published" ? "published" : "in-review"}`}>
                    {course.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions-cell">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Audit
                    </button>
                    <Link to={`/course/${course.id}`} className="btn btn-sm btn-secondary">
                      Preview
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODERATION MODAL */}
      {selectedCourse && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">{selectedCourse.category}</span>
                <h2>Course Moderation: {selectedCourse.title}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedCourse(null)}
              >
                ✕
              </button>
            </div>

            {actionSuccess ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Course Status Updated!</h3>
                <p className="text-muted">The curriculum visibility has been updated across the Learnova catalog.</p>
              </div>
            ) : (
              <div className="quiz-modal-body">
                <div className="recipient-info-box">
                  <div>
                    <strong>{selectedCourse.title}</strong>
                    <p className="text-muted" style={{ margin: "4px 0", fontSize: "13px" }}>
                      Instructor: <strong>{selectedCourse.instructor}</strong> ({selectedCourse.instructorEmail})
                    </p>
                    <p className="text-muted" style={{ margin: 0, fontSize: "12px" }}>
                      Curriculum Volume: {selectedCourse.modulesCount} Modules • Price: ${selectedCourse.price} • Current Status: {selectedCourse.status}
                    </p>
                  </div>
                </div>

                <div className="vetting-details-grid" style={{ marginTop: "16px" }}>
                  <div className="vetting-item">
                    <span>Syllabus Compliance:</span>
                    <strong className="text-success">Passed Quality Standard</strong>
                  </div>
                  <div className="vetting-item">
                    <span>Video Bitrate & CDN:</span>
                    <strong>1080p Transcoding Ready</strong>
                  </div>
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedCourse(null)}
                  >
                    Cancel
                  </button>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleUpdateCourseStatus(selectedCourse.id, "In Review")}
                    >
                      Request Revisions
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleUpdateCourseStatus(selectedCourse.id, "Published")}
                    >
                      Approve & Publish to Catalog
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
