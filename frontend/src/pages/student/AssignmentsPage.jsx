import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  XIcon,
  SparklesIcon
} from "../../components/Icons";
import { studentAssignments } from "../../data/studentData";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState(studentAssignments);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const pendingCount = assignments.filter((a) => a.status === "Pending").length;
  const submittedCount = assignments.filter((a) => a.status === "Submitted").length;
  const gradedCount = assignments.filter((a) => a.status === "Graded").length;

  const filtered = assignments.filter((a) => {
    if (activeFilter === "pending") return a.status === "Pending";
    if (activeFilter === "submitted") return a.status === "Submitted";
    if (activeFilter === "graded") return a.status === "Graded";
    return true;
  });

  const handleOpenSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionText("");
    setFileName("");
    setSubmitSuccess(false);
  };

  const handleFakeSubmit = (e) => {
    e.preventDefault();
    if (submissionText.trim() || fileName) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setAssignments((prev) =>
          prev.map((a) =>
            a.id === selectedAssignment.id ? { ...a, status: "Submitted" } : a
          )
        );
        setTimeout(() => setSelectedAssignment(null), 800);
      }, 800);
    }
  };

  return (
    <div className="student-assignments-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Course Assignments & Projects</h1>
          <p className="student-page-subtitle">
            Submit your real-world coding projects, inspect code reviews, and track evaluation scores.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Assignments ({assignments.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "pending" ? "active" : ""}`}
            onClick={() => setActiveFilter("pending")}
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "submitted" ? "active" : ""}`}
            onClick={() => setActiveFilter("submitted")}
          >
            Submitted ({submittedCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeFilter === "graded" ? "active" : ""}`}
            onClick={() => setActiveFilter("graded")}
          >
            Graded ({gradedCount})
          </button>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="assignments-cards-list">
        {filtered.map((item) => (
          <div key={item.id} className="assignment-item-card">
            <div className="assignment-card-header">
              <div className="assignment-meta-left">
                <span className="assignment-course-tag">{item.courseName}</span>
                <span className={`status-badge-tag ${item.status.toLowerCase()}`}>
                  {item.status === "Graded" && `✓ Graded: ${item.score}/${item.maxScore}`}
                  {item.status === "Pending" && "Action Required"}
                  {item.status === "Submitted" && "Under Review"}
                </span>
              </div>
              <div className="assignment-due-date">
                <CalendarIcon size={14} /> Due: <strong>{item.dueDate}</strong>
              </div>
            </div>

            <div className="assignment-card-body">
              <h3 className="assignment-title">{item.title}</h3>
              <p className="assignment-instructions">{item.instructions}</p>
              <div className="assignment-weight-info">
                <span>Weight: {item.weight}</span>
              </div>
            </div>

            <div className="assignment-card-footer">
              {item.status === "Pending" && (
                <button
                  type="button"
                  className="btn-primary-join"
                  onClick={() => handleOpenSubmit(item)}
                >
                  Submit Assignment
                </button>
              )}

              {item.status === "Submitted" && (
                <div className="submitted-note">
                  <CheckCircleIcon size={16} />
                  <span>Submitted on time. Peer & Instructor reviews pending.</span>
                </div>
              )}

              {item.status === "Graded" && (
                <div className="graded-result-box">
                  <span className="grade-score-num">{item.score} / {item.maxScore}</span>
                  <span className="grade-feedback-text">"Outstanding architecture and clean edge case handling."</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Submission Modal */}
      {selectedAssignment && (
        <div className="auth-modal-overlay" onClick={() => setSelectedAssignment(null)}>
          <div className="assignment-submit-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="auth-modal-close"
              onClick={() => setSelectedAssignment(null)}
            >
              <XIcon size={20} />
            </button>

            {submitSuccess ? (
              <div className="modal-success-state">
                <CheckCircleIcon size={48} className="modal-check-icon" />
                <h3>Assignment Submitted Successfully!</h3>
                <p>
                  Your code package for <strong>{selectedAssignment.title}</strong> has been logged into the evaluation queue.
                </p>
              </div>
            ) : (
              <>
                <div className="modal-header-block">
                  <span className="modal-course-name">{selectedAssignment.courseName}</span>
                  <h3>Submit: {selectedAssignment.title}</h3>
                  <p className="modal-due-hint">Due Date: {selectedAssignment.dueDate} • {selectedAssignment.weight}</p>
                </div>

                <form onSubmit={handleFakeSubmit} className="assignment-form">
                  <div className="modal-form-group">
                    <label>Git Repository or Solution URL *</label>
                    <input
                      type="url"
                      placeholder="https://github.com/your-username/project-repo"
                      required
                    />
                  </div>

                  <div className="modal-form-group">
                    <label>Implementation Notes / Self Reflection</label>
                    <textarea
                      rows="4"
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Briefly explain your architectural choices, libraries used, and how to run tests..."
                      required
                    ></textarea>
                  </div>

                  <div className="modal-form-group">
                    <label>Upload Zip Archive (Optional)</label>
                    <div className="fake-file-dropzone">
                      <input
                        type="file"
                        onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                      />
                      <span className="file-name-preview">
                        {fileName ? `Attached: ${fileName}` : "Drag & drop code archive or click to browse (.zip, .tar.gz)"}
                      </span>
                    </div>
                  </div>

                  <div className="modal-actions-row">
                    <button
                      type="button"
                      className="btn-modal-cancel"
                      onClick={() => setSelectedAssignment(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-modal-submit">
                      Confirm & Submit Project
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
