import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  PlusIcon,
  StarIcon,
  UsersIcon,
  EditIcon,
  EyeIcon,
  ClockIcon
} from "../../components/Icons";
import { teacherCourses } from "../../data/teacherData";

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState(teacherCourses);
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  const filteredCourses = courses.filter((c) => {
    if (activeTab === "published") return c.status === "published";
    if (activeTab === "draft") return c.status === "draft";
    if (activeTab === "in-review") return c.status === "in-review";
    return true;
  });

  return (
    <div className="teacher-courses-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Authored Curriculums & Courses</h1>
          <p className="student-page-subtitle">
            Manage your course library, edit syllabus modules, track learner feedback, and create new learning tracks.
          </p>
        </div>
        <div className="header-actions-group">
          <Link to="/teacher/courses/create" className="btn btn-primary">
            <PlusIcon size={16} />
            <span>Create New Course</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & View Mode Switch */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Courses ({courses.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "published" ? "active" : ""}`}
            onClick={() => setActiveTab("published")}
          >
            Published ({courses.filter((c) => c.status === "published").length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "draft" ? "active" : ""}`}
            onClick={() => setActiveTab("draft")}
          >
            Drafts ({courses.filter((c) => c.status === "draft").length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "in-review" ? "active" : ""}`}
            onClick={() => setActiveTab("in-review")}
          >
            In Review ({courses.filter((c) => c.status === "in-review").length})
          </button>
        </div>

        <div className="view-toggle-btns">
          <button
            type="button"
            className={`view-btn ${viewMode === "cards" ? "active" : ""}`}
            onClick={() => setViewMode("cards")}
          >
            Cards
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === "table" ? "active" : ""}`}
            onClick={() => setViewMode("table")}
          >
            Table
          </button>
        </div>
      </div>

      {/* VIEW: CARDS */}
      {viewMode === "cards" && (
        <div className="teacher-courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="teacher-course-card lms-content-card">
              <div className="t-card-thumb-wrap">
                <img src={course.thumbnail} alt={course.title} className="t-card-thumb" />
                <span className={`status-badge-absolute ${course.status}`}>
                  {course.status === "published" ? "Published" : course.status === "in-review" ? "In Review" : "Draft"}
                </span>
                <span className="price-badge-absolute">${course.price}</span>
              </div>

              <div className="t-card-content">
                <span className="t-card-category">{course.category} • {course.level}</span>
                <h3 className="t-card-title">{course.title}</h3>
                <p className="t-card-subtitle">{course.subtitle || course.description}</p>

                <div className="t-card-metrics-row">
                  <div className="t-metric-item">
                    <UsersIcon size={16} />
                    <span>{course.studentsCount ? `${course.studentsCount.toLocaleString()} Students` : "No enrollments"}</span>
                  </div>
                  {course.rating > 0 && (
                    <div className="t-metric-item">
                      <StarIcon size={16} filled={true} />
                      <span>{course.rating} ({course.reviewsCount})</span>
                    </div>
                  )}
                  <div className="t-metric-item">
                    <BookOpenIcon size={16} />
                    <span>{course.modulesCount || 4} Modules</span>
                  </div>
                </div>

                <div className="t-card-actions-footer">
                  <Link to={`/teacher/courses/${course.id}/edit`} className="btn btn-primary btn-sm flex-1">
                    <EditIcon size={14} />
                    <span>Course Builder</span>
                  </Link>
                  <Link to={`/course/${course.id}`} className="btn btn-secondary btn-sm">
                    <EyeIcon size={14} />
                    <span>View Public</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: TABLE */}
      {viewMode === "table" && (
        <div className="lms-content-card studio-table-container">
          <table className="studio-data-table">
            <thead>
              <tr>
                <th>Course Details</th>
                <th>Category & Level</th>
                <th>Active Learners</th>
                <th>Rating</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td>
                    <div className="table-course-cell">
                      <img src={course.thumbnail} alt={course.title} className="table-thumb" />
                      <div>
                        <strong>{course.title}</strong>
                        <span className="table-sub-detail">{course.modulesCount || 4} Modules • {course.lessonsCount || 16} Lessons</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="tag-category">{course.category}</span>
                    <span className="tag-level">{course.level}</span>
                  </td>
                  <td>
                    <strong>{course.studentsCount ? course.studentsCount.toLocaleString() : "—"}</strong>
                  </td>
                  <td>
                    {course.rating > 0 ? (
                      <span className="rating-pill">★ {course.rating}</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td><strong>${course.price}</strong></td>
                  <td>
                    <span className={`status-tag ${course.status}`}>
                      {course.status === "published" ? "Published" : course.status === "in-review" ? "In Review" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <Link to={`/teacher/courses/${course.id}/edit`} className="btn btn-sm btn-primary">
                        Edit
                      </Link>
                      <Link to={`/course/${course.id}`} className="btn btn-sm btn-secondary">
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
