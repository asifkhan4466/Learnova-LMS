import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  ClockIcon,
  AwardIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  ArrowRightIcon,
  FileTextIcon,
  HelpCircleIcon,
  SparklesIcon,
  CalendarIcon
} from "../../components/Icons";
import {
  studentProfile,
  studentStats,
  enrolledCourses,
  studentAssignments,
  studentQuizzes,
  studentCertificates
} from "../../data/studentData";

export default function StudentDashboardPage() {
  const inProgressCourses = enrolledCourses.filter((c) => c.status === "in-progress");
  const heroCourse = inProgressCourses[0] || enrolledCourses[0];
  const pendingAssignments = studentAssignments.filter((a) => a.status === "Pending");
  const availableQuizzes = studentQuizzes.filter((q) => q.status === "Available" || q.status === "Not Started");

  return (
    <div className="student-dashboard-content">
      {/* 1. HERO / WELCOME SECTION */}
      <section className="student-hero-banner">
        <div className="student-hero-text">
          <div className="hero-streak-pill">
            <SparklesIcon size={14} />
            <span>{studentStats.weeklyStreak} Day Learning Streak! Keep it going</span>
          </div>
          <h1>Welcome back, {studentProfile.name.split(" ")[0]}! 👋</h1>
          <p className="student-hero-desc">
            You're currently enrolled in <strong>{enrolledCourses.length} specializations</strong> with <strong>{studentStats.weeklyHours} hours</strong> completed this week.
          </p>
        </div>

        {/* Hero Resume Course Quick-Card */}
        {heroCourse && (
          <div className="hero-resume-card">
            <span className="resume-tag">CONTINUE LEARNING</span>
            <h3>{heroCourse.title}</h3>
            <p className="resume-lesson-title">{heroCourse.currentLesson}</p>

            <div className="resume-progress-row">
              <div className="resume-bar-track">
                <div className="resume-bar-fill" style={{ width: `${heroCourse.progress}%` }}></div>
              </div>
              <span className="resume-pct-label">{heroCourse.progress}%</span>
            </div>

            <Link to={`/student/course/${heroCourse.id}`} className="btn-resume-primary">
              <PlayCircleIcon size={18} />
              <span>Resume Course</span>
            </Link>
          </div>
        )}
      </section>

      {/* 2. LEARNING METRICS OVERVIEW */}
      <section className="student-stats-row">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <BookOpenIcon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{enrolledCourses.length}</span>
            <span className="stat-title">Enrolled Courses</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper teal">
            <ClockIcon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{studentStats.totalHours} hrs</span>
            <span className="stat-title">Total Study Time</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper amber">
            <CheckCircleIcon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{studentStats.completedCoursesCount}</span>
            <span className="stat-title">Completed Courses</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper violet">
            <AwardIcon size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{studentStats.certificatesCount}</span>
            <span className="stat-title">Verified Certificates</span>
          </div>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD SPLIT: ENROLLED COURSES & RIGHT SIDEBAR WIDGETS */}
      <div className="student-dashboard-grid">
        {/* Left Column: In Progress & Recently Viewed */}
        <div className="dashboard-left-col">
          {/* In Progress Courses */}
          <div className="lms-content-card">
            <div className="card-header-flex">
              <div>
                <h2>In Progress Specializations</h2>
                <p className="card-subtitle">Pick up right where you left off in your active lessons</p>
              </div>
              <Link to="/student/my-learning" className="card-header-link">
                View All My Courses ({enrolledCourses.length}) →
              </Link>
            </div>

            <div className="enrolled-courses-list">
              {inProgressCourses.map((course) => (
                <div key={course.id} className="student-course-item-card">
                  <img src={course.thumbnail} alt={course.title} className="course-item-thumb" />
                  <div className="course-item-details">
                    <div className="course-item-top">
                      <span className="course-item-category">{course.category}</span>
                      <span className="course-item-last-active">Active {course.lastAccessed}</span>
                    </div>

                    <h3 className="course-item-title">{course.title}</h3>
                    <p className="course-item-lesson-info">
                      <PlayCircleIcon size={14} className="lesson-play-mini" />
                      {course.currentLesson}
                    </p>

                    <div className="course-item-progress-section">
                      <div className="course-progress-bar-track">
                        <div
                          className="course-progress-bar-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="course-progress-labels">
                        <span>{course.progress}% Completed</span>
                        <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                      </div>
                    </div>

                    <div className="course-item-actions">
                      <Link to={`/student/course/${course.id}`} className="btn-continue-course">
                        Continue Learning →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Completed / Badges Section */}
          <div className="lms-content-card">
            <div className="card-header-flex">
              <div>
                <h2>Completed Specializations & Achievements</h2>
                <p className="card-subtitle">Courses you have fully finished and verified</p>
              </div>
              <Link to="/student/certificates" className="card-header-link">
                Certificates →
              </Link>
            </div>

            <div className="completed-courses-list">
              {enrolledCourses.filter((c) => c.status === "completed").map((course) => (
                <div key={course.id} className="completed-course-banner">
                  <img src={course.thumbnail} alt={course.title} className="completed-thumb" />
                  <div className="completed-info">
                    <span className="completed-badge">✓ Course Completed</span>
                    <h3>{course.title}</h3>
                    <p>Instructor: {course.instructor} • Grade: 98% (High Distinction)</p>
                  </div>
                  <Link to="/student/certificates" className="btn-view-cert">
                    View Certificate
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming Assignments, Quizzes & Study Activity */}
        <div className="dashboard-right-col">
          {/* Upcoming Assignments Widget */}
          <div className="lms-content-card">
            <div className="card-header-flex">
              <div>
                <h3>Upcoming Assignments</h3>
                <span className="widget-badge">{pendingAssignments.length} Action Needed</span>
              </div>
              <Link to="/student/assignments" className="widget-more-link">All →</Link>
            </div>

            <div className="widget-items-list">
              {studentAssignments.slice(0, 3).map((item) => (
                <div key={item.id} className="widget-item-row">
                  <div className="widget-item-header">
                    <span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span>
                    <span className="due-date-text">Due {item.dueDate}</span>
                  </div>
                  <h4 className="widget-item-title">{item.title}</h4>
                  <p className="widget-item-course">{item.courseName}</p>
                  <Link to="/student/assignments" className="widget-action-link">
                    {item.status === "Pending" ? "Submit Assignment →" : "View Feedback →"}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Quizzes Widget */}
          <div className="lms-content-card">
            <div className="card-header-flex">
              <div>
                <h3>Available Quizzes</h3>
                <span className="widget-badge purple">{availableQuizzes.length} Open</span>
              </div>
              <Link to="/student/quizzes" className="widget-more-link">All →</Link>
            </div>

            <div className="widget-items-list">
              {studentQuizzes.slice(0, 2).map((quiz) => (
                <div key={quiz.id} className="widget-item-row">
                  <div className="widget-item-header">
                    <span className={`status-tag ${quiz.status.toLowerCase().replace(/\s+/g, "")}`}>
                      {quiz.status}
                    </span>
                    <span className="due-date-text">{quiz.duration} • {quiz.questionsCount} Qs</span>
                  </div>
                  <h4 className="widget-item-title">{quiz.title}</h4>
                  <p className="widget-item-course">{quiz.courseName}</p>
                  <Link to="/student/quizzes" className="widget-action-link">
                    Take Quiz →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="lms-content-card shortcuts-card">
            <h3>Quick Actions</h3>
            <div className="shortcuts-links-grid">
              <Link to="/student/my-learning" className="shortcut-btn">
                <BookOpenIcon size={16} /> My Learning
              </Link>
              <Link to="/student/courses" className="shortcut-btn">
                <SparklesIcon size={16} /> Browse New
              </Link>
              <Link to="/student/progress" className="shortcut-btn">
                <AwardIcon size={16} /> Study Stats
              </Link>
              <Link to="/student/profile" className="shortcut-btn">
                <CalendarIcon size={16} /> Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
