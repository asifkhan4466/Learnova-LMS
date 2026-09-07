import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  CheckCircleIcon,
  MailIcon,
  ClockIcon
} from "../../components/Icons";
import { teacherStudents, teacherCourses } from "../../data/teacherData";

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState(teacherStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [contactModalStudent, setContactModalStudent] = useState(null);
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState("");

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || s.courseId === selectedCourse;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setMessageText("");
        setContactModalStudent(null);
      }, 1500);
    }
  };

  return (
    <div className="teacher-students-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Enrolled Learners & Student Roster</h1>
          <p className="student-page-subtitle">
            Inspect learner pacing, completion milestones, academic performance, and communicate directly with your cohort.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val">{students.length}</span>
          <span className="badge-stat-lbl">Active Cohort Sample</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="learning-filter-bar">
        <div className="search-filter-wrap">
          <div className="search-input-box">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name or email..."
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
              <option value="all">All Enrolled Curriculums</option>
              {teacherCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="studio-filter-select"
            >
              <option value="all">All Performance Levels</option>
              <option value="Top Performer">Top Performer</option>
              <option value="On Track">On Track</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Enrolled Curriculum</th>
              <th>Enrolled Date</th>
              <th>Course Pacing</th>
              <th>Current Grade</th>
              <th>Performance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((stu) => (
              <tr key={stu.id}>
                <td>
                  <div className="table-user-cell">
                    <img src={stu.avatar} alt={stu.name} className="table-avatar" />
                    <div>
                      <strong>{stu.name}</strong>
                      <span className="table-sub-detail">{stu.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="course-ref-text">{stu.courseName}</span>
                </td>
                <td>{stu.enrolledDate}</td>
                <td>
                  <div className="table-progress-cell">
                    <div className="lms-progress-track">
                      <div className="lms-progress-fill" style={{ width: `${stu.progress}%` }}></div>
                    </div>
                    <span className="progress-num">{stu.progress}%</span>
                  </div>
                </td>
                <td>
                  <span className="table-grade-badge">{stu.grade}</span>
                </td>
                <td>
                  <span
                    className={`performance-pill ${
                      stu.status === "Top Performer"
                        ? "top"
                        : stu.status === "On Track"
                        ? "track"
                        : "attention"
                    }`}
                  >
                    {stu.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => setContactModalStudent(stu)}
                  >
                    <MailIcon size={14} />
                    <span>Message</span>
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)" }}>
                  No learners matched your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MESSAGE STUDENT MODAL */}
      {contactModalStudent && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Direct Instructor Message</span>
                <h2>Message {contactModalStudent.name}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setContactModalStudent(null)}
              >
                ✕
              </button>
            </div>

            {messageSent ? (
              <div className="quiz-modal-body" style={{ textAlign: "center", padding: "32px 20px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Message Sent Successfully!</h3>
                <p className="text-muted">A notification and copy has been delivered to {contactModalStudent.email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="quiz-modal-body">
                <div className="recipient-info-box">
                  <img src={contactModalStudent.avatar} alt={contactModalStudent.name} className="stu-mini-avatar" />
                  <div>
                    <strong>{contactModalStudent.name}</strong> ({contactModalStudent.email})
                    <p className="text-muted" style={{ fontSize: "12px", margin: 0 }}>
                      Enrolled in: {contactModalStudent.courseName} • Progress: {contactModalStudent.progress}%
                    </p>
                  </div>
                </div>

                <div className="form-group full-width" style={{ marginTop: "16px" }}>
                  <label>Message Content</label>
                  <textarea
                    rows={5}
                    placeholder="Write constructive guidance, lab advice, or encouragement..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    required
                  />
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setContactModalStudent(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Direct Note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
