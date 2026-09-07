import React from "react";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  BookOpenIcon,
  StarIcon,
  DollarSignIcon,
  PlusIcon,
  VideoIcon,
  FileTextIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  SparklesIcon
} from "../../components/Icons";
import {
  teacherProfile,
  teacherStats,
  teacherCourses,
  teacherStudents,
  teacherAssignments,
  teacherLiveClasses
} from "../../data/teacherData";

export default function TeacherDashboardPage() {
  const publishedCourses = teacherCourses.filter((c) => c.status === "published");
  const upcomingClasses = teacherLiveClasses.filter((c) => c.status === "upcoming");
  const pendingAssignments = teacherAssignments.filter((a) => a.pendingGrading > 0);

  return (
    <div className="teacher-dashboard-page">
      {/* Studio Welcome Hero Banner */}
      <div className="teacher-welcome-banner">
        <div className="welcome-banner-text">
          <div className="instructor-badge-chip">
            <SparklesIcon size={14} />
            <span>INSTRUCTOR STUDIO WORKSPACE</span>
          </div>
          <h1>Welcome back, {teacherProfile.name}!</h1>
          <p className="welcome-banner-sub">
            Your curricula reached <strong>{teacherStats.totalStudents.toLocaleString()} enrolled learners</strong> this semester. You have <strong>{teacherStats.pendingGrading} submissions</strong> waiting for evaluation and <strong>{upcomingClasses.length} live sessions</strong> on schedule.
          </p>
          <div className="welcome-actions-row">
            <Link to="/teacher/courses/create" className="btn btn-primary btn-banner-cta">
              <PlusIcon size={16} />
              <span>Create New Course</span>
            </Link>
            <Link to="/teacher/courses" className="btn btn-banner-secondary">
              Manage My Courses →
            </Link>
          </div>
        </div>

        <div className="banner-metric-box">
          <div className="metric-box-title">Monthly Net Earnings</div>
          <div className="metric-box-val">${teacherStats.monthlyEarnings.toLocaleString()}</div>
          <div className="metric-box-trend">
            <span className="trend-green">↑ 14.8%</span> vs last month
          </div>
          <div className="metric-box-sub">Total Lifetime: ${teacherStats.totalEarnings.toLocaleString()}</div>
        </div>
      </div>

      {/* Top High-Level Metrics */}
      <div className="teacher-stats-grid">
        <div className="teacher-stat-card lms-content-card">
          <div className="t-stat-icon-wrap blue">
            <UsersIcon size={24} />
          </div>
          <div className="t-stat-info">
            <span className="t-stat-num">{teacherStats.totalStudents.toLocaleString()}</span>
            <span className="t-stat-lbl">Active Students</span>
          </div>
        </div>

        <div className="teacher-stat-card lms-content-card">
          <div className="t-stat-icon-wrap purple">
            <BookOpenIcon size={24} />
          </div>
          <div className="t-stat-info">
            <span className="t-stat-num">{teacherStats.publishedCourses} Courses</span>
            <span className="t-stat-lbl">Published & Live</span>
          </div>
        </div>

        <div className="teacher-stat-card lms-content-card">
          <div className="t-stat-icon-wrap amber">
            <StarIcon size={24} filled={true} />
          </div>
          <div className="t-stat-info">
            <span className="t-stat-num">{teacherStats.overallRating} ★</span>
            <span className="t-stat-lbl">Instructor Rating ({teacherStats.ratingCount.toLocaleString()})</span>
          </div>
        </div>

        <div className="teacher-stat-card lms-content-card">
          <div className="t-stat-icon-wrap red">
            <FileTextIcon size={24} />
          </div>
          <div className="t-stat-info">
            <span className="t-stat-num">{teacherStats.pendingGrading} Items</span>
            <span className="t-stat-lbl">Pending Grading</span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Upcoming Live & Pending Grading */}
      <div className="studio-split-grid">
        {/* Upcoming Live Classes Widget */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Upcoming Live Broadcasts</h3>
              <p className="card-subtitle">Scheduled interactive masterclasses & office hours</p>
            </div>
            <Link to="/teacher/live-classes" className="link-view-all">
              All Classes →
            </Link>
          </div>

          <div className="studio-tasks-list">
            {upcomingClasses.map((item) => (
              <div key={item.id} className="live-task-card">
                <div className="live-icon-chip">
                  <VideoIcon size={20} />
                </div>
                <div className="live-task-body">
                  <span className="live-course-tag">{item.course}</span>
                  <h4 className="live-task-title">{item.title}</h4>
                  <div className="live-meta-row">
                    <span><ClockIcon size={14} /> {item.dateTime}</span>
                    <span><UsersIcon size={14} /> {item.enrolledAttendees} Expected</span>
                    <span className="badge-duration">{item.duration}</span>
                  </div>
                </div>
                <Link to="/teacher/live-classes" className="btn btn-sm btn-primary">
                  Enter Room
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Grading Tasks Widget */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Assignments Needing Evaluation</h3>
              <p className="card-subtitle">Code projects & labs submitted by students</p>
            </div>
            <Link to="/teacher/assignments" className="link-view-all">
              Gradebook ({teacherStats.pendingGrading}) →
            </Link>
          </div>

          <div className="studio-tasks-list">
            {pendingAssignments.map((assign) => (
              <div key={assign.id} className="grading-task-card">
                <div className="grading-icon-chip">
                  <FileTextIcon size={20} />
                </div>
                <div className="grading-task-body">
                  <span className="live-course-tag">{assign.courseName}</span>
                  <h4 className="live-task-title">{assign.title}</h4>
                  <div className="grading-meta-row">
                    <span className="text-danger">Due: {assign.dueDate}</span>
                    <span>Submissions: {assign.totalSubmissions}</span>
                    <span className="badge-pending">{assign.pendingGrading} Unchecked</span>
                  </div>
                </div>
                <Link to="/teacher/assignments" className="btn btn-sm btn-secondary">
                  Grade Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Published Courses Performance Overview */}
      <div className="lms-content-card" style={{ marginTop: "24px" }}>
        <div className="card-header-flex">
          <div>
            <h3>Course Catalog Overview</h3>
            <p className="card-subtitle">Live enrollment metrics and student satisfaction by curriculum</p>
          </div>
          <Link to="/teacher/courses" className="btn btn-sm btn-primary">
            + Manage Curricula
          </Link>
        </div>

        <div className="studio-table-container">
          <table className="studio-data-table">
            <thead>
              <tr>
                <th>Course Curriculum</th>
                <th>Category</th>
                <th>Enrolled</th>
                <th>Student Rating</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teacherCourses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="table-course-cell">
                      <img src={c.thumbnail} alt={c.title} className="table-thumb" />
                      <div>
                        <strong>{c.title}</strong>
                        <span className="table-sub-detail">{c.modulesCount} Modules • {c.lessonsCount} Lessons</span>
                      </div>
                    </div>
                  </td>
                  <td>{c.category}</td>
                  <td><strong>{c.studentsCount ? c.studentsCount.toLocaleString() : "—"}</strong></td>
                  <td>
                    {c.rating > 0 ? (
                      <span className="rating-pill">★ {c.rating} ({c.reviewsCount})</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>${c.price}</td>
                  <td>
                    <span className={`status-tag ${c.status}`}>
                      {c.status === "published" ? "Published" : c.status === "in-review" ? "In Review" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <Link to={`/teacher/courses/${c.id}/edit`} className="btn btn-sm btn-secondary">
                        Edit
                      </Link>
                      <Link to={`/course/${c.id}`} className="btn btn-sm btn-outline">
                        Preview
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Student Enrollments */}
      <div className="lms-content-card" style={{ marginTop: "24px" }}>
        <div className="card-header-flex">
          <div>
            <h3>Recent Student Enrollments</h3>
            <p className="card-subtitle">Students actively progressing through your curricula</p>
          </div>
          <Link to="/teacher/students" className="link-view-all">
            All Students ({teacherStats.totalStudents.toLocaleString()}) →
          </Link>
        </div>

        <div className="students-quick-grid">
          {teacherStudents.slice(0, 4).map((stu) => (
            <div key={stu.id} className="student-tile-mini">
              <img src={stu.avatar} alt={stu.name} className="stu-mini-avatar" />
              <div className="stu-mini-info">
                <span className="stu-mini-name">{stu.name}</span>
                <span className="stu-mini-course">{stu.courseName}</span>
                <div className="stu-mini-progress">
                  <div className="lms-progress-track">
                    <div className="lms-progress-fill" style={{ width: `${stu.progress}%` }}></div>
                  </div>
                  <span className="progress-num">{stu.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
