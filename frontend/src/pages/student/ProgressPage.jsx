import React from "react";
import { Link } from "react-router-dom";
import {
  AwardIcon,
  ClockIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  SparklesIcon,
  PlayCircleIcon
} from "../../components/Icons";
import { studentProfile, studentStats, enrolledCourses, weeklyActivity, studentAssignments, studentQuizzes } from "../../data/studentData";

export default function ProgressPage() {
  const maxWeeklyHours = Math.max(...weeklyActivity.map((w) => w.hours), 4);

  const gradedAssignments = studentAssignments.filter((a) => a.score !== null);
  const avgAssignmentScore = gradedAssignments.length
    ? Math.round(gradedAssignments.reduce((acc, a) => acc + a.score, 0) / gradedAssignments.length)
    : 95;

  const passedQuizzes = studentQuizzes.filter((q) => q.score !== null);
  const avgQuizScore = passedQuizzes.length
    ? Math.round(passedQuizzes.reduce((acc, q) => acc + q.score, 0) / passedQuizzes.length)
    : studentStats.avgQuizScore;

  return (
    <div className="student-progress-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Learning Progress & Analytics</h1>
          <p className="student-page-subtitle">
            Track your milestones, weekly study streaks, quiz performance, and skill competency.
          </p>
        </div>
      </div>

      {/* Top High-Level Metrics */}
      <div className="progress-overview-cards">
        <div className="progress-stat-tile">
          <div className="stat-tile-icon blue"><ClockIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{studentStats.totalHours} hrs</div>
            <div className="stat-tile-desc">Total Platform Study Time</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon teal"><CheckCircleIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{studentStats.completedLessons} / {studentStats.totalLessons}</div>
            <div className="stat-tile-desc">Lessons & Labs Completed</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon amber"><SparklesIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{studentStats.weeklyStreak} Days</div>
            <div className="stat-tile-desc">Current Learning Streak</div>
          </div>
        </div>

        <div className="progress-stat-tile">
          <div className="stat-tile-icon violet"><AwardIcon size={24} /></div>
          <div>
            <div className="stat-tile-num">{avgQuizScore}% Avg</div>
            <div className="stat-tile-desc">Evaluation & Quiz Score</div>
          </div>
        </div>
      </div>

      {/* Analytics Grid: Weekly Chart & Competency */}
      <div className="analytics-split-grid">
        {/* Weekly Activity Bar Chart */}
        <div className="lms-content-card">
          <div className="card-header-flex">
            <div>
              <h3>Weekly Learning Activity (Hours)</h3>
              <p className="card-subtitle">Study time logged across lessons, labs, and assignments</p>
            </div>
            <span className="badge-weekly-total">{studentStats.weeklyHours} hrs this week</span>
          </div>

          <div className="weekly-chart-wrapper">
            <div className="weekly-bars-container">
              {weeklyActivity.map((item) => {
                const heightPct = Math.round((item.hours / maxWeeklyHours) * 100);
                return (
                  <div key={item.day} className="chart-col">
                    <span className="chart-val-label">{item.hours}h</span>
                    <div className="chart-bar-track">
                      <div className="chart-bar-fill" style={{ height: `${heightPct}%` }}></div>
                    </div>
                    <span className="chart-day-label">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Academic Performance Summary */}
        <div className="lms-content-card">
          <h3>Academic Performance Summary</h3>
          <p className="card-subtitle">Evaluated through quizzes, lab milestones, and code reviews</p>

          <div className="performance-metrics-list">
            <div className="perf-item">
              <div className="perf-label-row">
                <span>Quiz Knowledge Checks</span>
                <strong>{avgQuizScore}%</strong>
              </div>
              <div className="perf-bar-track">
                <div className="perf-bar-fill teal" style={{ width: `${avgQuizScore}%` }}></div>
              </div>
            </div>

            <div className="perf-item">
              <div className="perf-label-row">
                <span>Hands-on Code Projects</span>
                <strong>{avgAssignmentScore}%</strong>
              </div>
              <div className="perf-bar-track">
                <div className="perf-bar-fill blue" style={{ width: `${avgAssignmentScore}%` }}></div>
              </div>
            </div>

            <div className="perf-item">
              <div className="perf-label-row">
                <span>Overall Curriculum Pace</span>
                <strong>Ahead of Schedule</strong>
              </div>
              <div className="perf-bar-track">
                <div className="perf-bar-fill violet" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>

          <div className="streak-callout-box">
            <SparklesIcon size={20} className="streak-icon" />
            <div>
              <strong>Streak Bonus Active!</strong>
              <p>Studying at least 30 minutes every day increases retention by 3.2x.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course-Wise Detailed Progress */}
      <div className="lms-content-card">
        <div className="card-header-flex">
          <div>
            <h2>Course-Wise Progress Breakdown</h2>
            <p className="card-subtitle">Detailed completion statistics per enrolled curriculum</p>
          </div>
          <Link to="/student/my-learning" className="card-header-link">
            Open Course Player →
          </Link>
        </div>

        <div className="course-progress-table-wrap">
          <table className="course-progress-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Completed Lessons</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="course-cell-title">
                      <img src={c.thumbnail} alt={c.title} className="table-thumb" />
                      <div>
                        <strong>{c.title}</strong>
                        <span>Instructor: {c.instructor}</span>
                      </div>
                    </div>
                  </td>
                  <td>{c.category}</td>
                  <td>
                    <span className={`status-pill ${c.status}`}>
                      {c.status === "in-progress" && "In Progress"}
                      {c.status === "completed" && "Completed"}
                      {c.status === "not-started" && "Not Started"}
                    </span>
                  </td>
                  <td>
                    <div className="table-progress-wrap">
                      <div className="table-progress-bar">
                        <div className="table-progress-fill" style={{ width: `${c.progress}%` }}></div>
                      </div>
                      <span className="table-progress-pct">{c.progress}%</span>
                    </div>
                  </td>
                  <td>{c.completedLessons} / {c.totalLessons}</td>
                  <td>
                    {c.status === "completed" ? (
                      <Link to="/student/certificates" className="btn-table-resume cert">
                        Certificate
                      </Link>
                    ) : (
                      <Link to={`/student/course/${c.id}`} className="btn-table-resume">
                        <PlayCircleIcon size={14} /> Resume
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
