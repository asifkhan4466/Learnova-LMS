import React, { useState } from "react";
import {
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  ExternalLinkIcon,
  SparklesIcon
} from "../../components/Icons";
import { teacherAssignments } from "../../data/teacherData";

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState(teacherAssignments);
  const [activeTab, setActiveTab] = useState("all");
  const [activeSubmissionModal, setActiveSubmissionModal] = useState(null); // { assignmentId, submission: {...} }
  const [gradingScore, setGradingScore] = useState("");
  const [gradingFeedback, setGradingFeedback] = useState("");
  const [gradeSuccess, setGradeSuccess] = useState(false);

  const handleOpenGrade = (assignment, sub) => {
    setActiveSubmissionModal({ assignment, sub });
    setGradingScore(sub.score !== null ? sub.score.toString() : "95");
    setGradingFeedback(sub.feedback || "Clean modular design! Great handling of error boundaries and edge cases.");
    setGradeSuccess(false);
  };

  const handleSubmitGrade = (e) => {
    e.preventDefault();
    if (!gradingScore) return;

    const numScore = parseInt(gradingScore, 10);

    setAssignments((prev) =>
      prev.map((assign) => {
        if (assign.id === activeSubmissionModal.assignment.id) {
          const updatedSubs = assign.submissions.map((s) => {
            if (s.id === activeSubmissionModal.sub.id) {
              return {
                ...s,
                status: "Graded",
                score: numScore,
                feedback: gradingFeedback
              };
            }
            return s;
          });

          const pendingCount = updatedSubs.filter((s) => s.status === "Pending").length;
          const gradedCount = updatedSubs.filter((s) => s.status === "Graded").length;

          return {
            ...assign,
            pendingGrading: Math.max(0, assign.pendingGrading - 1),
            gradedCount: assign.gradedCount + 1,
            submissions: updatedSubs
          };
        }
        return assign;
      })
    );

    setGradeSuccess(true);
    setTimeout(() => {
      setActiveSubmissionModal(null);
      setGradeSuccess(false);
    }, 1200);
  };

  return (
    <div className="teacher-assignments-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Assignments & Practical Evaluations</h1>
          <p className="student-page-subtitle">
            Review student repository submissions, inspect architecture code, provide constructive feedback, and award marks.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-danger">8</span>
          <span className="badge-stat-lbl">Pending Submissions</span>
        </div>
      </div>

      {/* Assignment Overview List */}
      <div className="assignments-overview-stack">
        {assignments.map((assign) => (
          <div key={assign.id} className="assignment-overview-card lms-content-card">
            <div className="assign-header-split">
              <div>
                <span className="assign-course-tag">{assign.courseName}</span>
                <h3 className="assign-title">{assign.title}</h3>
                <div className="assign-meta-pills">
                  <span><ClockIcon size={14} /> Due Date: <strong>{assign.dueDate}</strong></span>
                  <span><UsersIcon size={14} /> Total Submissions: <strong>{assign.totalSubmissions}</strong></span>
                  <span className="badge-graded">Graded: {assign.gradedCount}</span>
                </div>
              </div>

              <div className="assign-status-right">
                {assign.pendingGrading > 0 ? (
                  <span className="badge-pending-large">
                    {assign.pendingGrading} Awaiting Review
                  </span>
                ) : (
                  <span className="badge-completed-large">
                    All Submissions Graded ✓
                  </span>
                )}
              </div>
            </div>

            {/* Submissions Table / Queue */}
            {assign.submissions && assign.submissions.length > 0 && (
              <div className="submissions-queue-table-wrap">
                <h4 className="queue-title">Recent Submissions for this Project:</h4>
                <table className="studio-data-table queue-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Submitted Time</th>
                      <th>Repository / Artifact</th>
                      <th>Grading Status</th>
                      <th>Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assign.submissions.map((sub) => (
                      <tr key={sub.id}>
                        <td>
                          <div className="table-user-cell">
                            <img src={sub.studentAvatar} alt={sub.studentName} className="table-avatar" />
                            <strong>{sub.studentName}</strong>
                          </div>
                        </td>
                        <td>{sub.submittedDate}</td>
                        <td>
                          <a
                            href={`https://${sub.repoUrl}`}
                            target="_blank"
                            rel="noreferrer"
                            className="repo-link"
                          >
                            <span>{sub.repoUrl}</span>
                            <ExternalLinkIcon size={14} />
                          </a>
                        </td>
                        <td>
                          <span className={`status-tag ${sub.status.toLowerCase()}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td>
                          {sub.score !== null ? (
                            <span className="score-pill-success">{sub.score} / 100</span>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`btn btn-sm ${sub.status === "Pending" ? "btn-primary" : "btn-secondary"}`}
                            onClick={() => handleOpenGrade(assign, sub)}
                          >
                            {sub.status === "Pending" ? "Grade Submission" : "Edit Grade"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* GRADING SUBMISSION MODAL */}
      {activeSubmissionModal && (
        <div className="modal-overlay">
          <div className="cert-modal-dialog" style={{ maxWidth: "780px" }}>
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">{activeSubmissionModal.assignment.courseName}</span>
                <h2>Evaluate Submission: {activeSubmissionModal.sub.studentName}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveSubmissionModal(null)}
              >
                ✕
              </button>
            </div>

            {gradeSuccess ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Grade & Feedback Submitted!</h3>
                <p className="text-muted">The student has been notified with their score and instructor comments.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitGrade} className="quiz-modal-body">
                {/* Submission Details */}
                <div className="submission-inspect-box">
                  <div className="sub-inspect-row">
                    <span>Repository URL:</span>
                    <a href={`https://${activeSubmissionModal.sub.repoUrl}`} target="_blank" rel="noreferrer" className="repo-link">
                      {activeSubmissionModal.sub.repoUrl} <ExternalLinkIcon size={12} />
                    </a>
                  </div>
                  <div className="sub-inspect-row">
                    <span>Submission Timestamp:</span>
                    <strong>{activeSubmissionModal.sub.submittedDate}</strong>
                  </div>

                  <div className="code-snippet-preview">
                    <span className="snippet-heading">Code Preview / Entrypoint:</span>
                    <pre>
                      <code>{activeSubmissionModal.sub.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                {/* Score and Feedback inputs */}
                <div className="form-fields-grid" style={{ marginTop: "18px" }}>
                  <div className="form-group">
                    <label>Award Score (out of 100) *</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={gradingScore}
                      onChange={(e) => setGradingScore(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Passing Threshold</label>
                    <input type="text" value="70% Required to Pass" disabled className="bg-disabled" />
                  </div>
                </div>

                <div className="form-group full-width" style={{ marginTop: "14px" }}>
                  <label>Instructor Qualitative Feedback & Code Review Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Provide constructive feedback on code structure, algorithmic efficiency, and schema..."
                    value={gradingFeedback}
                    onChange={(e) => setGradingFeedback(e.target.value)}
                    required
                  />
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setActiveSubmissionModal(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Record Grade & Send Feedback
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
