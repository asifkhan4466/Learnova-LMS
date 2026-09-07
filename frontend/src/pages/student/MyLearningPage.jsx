import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlayCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  SearchIcon,
  AwardIcon
} from "../../components/Icons";
import { enrolledCourses } from "../../data/studentData";

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = enrolledCourses.filter((course) => {
    // Tab filtering
    if (activeTab === "in-progress" && course.status !== "in-progress") return false;
    if (activeTab === "completed" && course.status !== "completed") return false;
    if (activeTab === "not-started" && course.status !== "not-started") return false;

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchInstructor = course.instructor.toLowerCase().includes(q);
      const matchCategory = course.category.toLowerCase().includes(q);
      if (!matchTitle && !matchInstructor && !matchCategory) return false;
    }
    return true;
  });

  const inProgressCount = enrolledCourses.filter((c) => c.status === "in-progress").length;
  const completedCount = enrolledCourses.filter((c) => c.status === "completed").length;
  const notStartedCount = enrolledCourses.filter((c) => c.status === "not-started").length;

  return (
    <div className="student-my-learning-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>My Learning</h1>
          <p className="student-page-subtitle">
            All your enrolled specializations, ongoing progress, and completed certifications.
          </p>
        </div>
        <Link to="/student/courses" className="btn-browse-more">
          + Explore More Courses
        </Link>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Courses ({enrolledCourses.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "in-progress" ? "active" : ""}`}
            onClick={() => setActiveTab("in-progress")}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed ({completedCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "not-started" ? "active" : ""}`}
            onClick={() => setActiveTab("not-started")}
          >
            Not Started ({notStartedCount})
          </button>
        </div>

        {/* Search */}
        <div className="my-learning-search">
          <SearchIcon size={16} className="search-icon-inline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter my courses by title or skill..."
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="my-learning-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="my-course-card">
              <div className="my-course-media">
                <img src={course.thumbnail} alt={course.title} className="my-course-img" />
                <span className={`status-badge-overlay ${course.status}`}>
                  {course.status === "in-progress" && "In Progress"}
                  {course.status === "completed" && "Completed"}
                  {course.status === "not-started" && "Not Started"}
                </span>
              </div>

              <div className="my-course-body">
                <div className="my-course-cat">{course.category}</div>
                <h3 className="my-course-title">
                  <Link to={`/student/course/${course.id}`}>{course.title}</Link>
                </h3>
                <p className="my-course-instructor">Instructor: {course.instructor}</p>

                {/* Progress Bar */}
                <div className="my-course-progress-wrap">
                  <div className="progress-info-row">
                    <span>Progress: {course.progress}%</span>
                    <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                  </div>
                  <div className="progress-track-bar">
                    <div
                      className={`progress-fill-bar ${course.status === "completed" ? "completed" : ""}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="my-course-current-lesson">
                  <span className="current-label">Current:</span>
                  <p>{course.currentLesson}</p>
                </div>

                {/* Card Action Buttons */}
                <div className="my-course-footer">
                  {course.status === "completed" ? (
                    <Link to="/student/certificates" className="btn-my-cert">
                      <AwardIcon size={16} />
                      <span>View Certificate</span>
                    </Link>
                  ) : (
                    <Link to={`/student/course/${course.id}`} className="btn-my-continue">
                      <PlayCircleIcon size={16} />
                      <span>{course.nextAction}</span>
                    </Link>
                  )}
                  <Link to={`/course/${course.id}`} className="btn-syllabus-link">
                    Syllabus
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-learning-state">
          <BookOpenIcon size={48} className="empty-icon" />
          <h3>No courses found in this view</h3>
          <p>Explore our wide catalog of cutting-edge tech specializations to start learning.</p>
          <Link to="/student/courses" className="btn-primary-join">
            Browse All Courses
          </Link>
        </div>
      )}
    </div>
  );
}
