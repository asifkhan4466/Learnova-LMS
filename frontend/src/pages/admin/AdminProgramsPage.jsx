import React, { useState } from "react";
import {
  GraduationCapIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  AwardIcon
} from "../../components/Icons";
import { adminPrograms, adminDepartments } from "../../data/adminData";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState(adminPrograms);
  const [modalOpen, setModalOpen] = useState(false);
  const [progForm, setProgForm] = useState({
    title: "",
    code: "",
    department: "Artificial Intelligence & Autonomous Systems",
    duration: "6 Months",
    credits: 24
  });

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (!progForm.title) return;
    const newProg = {
      id: `prog-${Date.now()}`,
      title: progForm.title,
      code: progForm.code.toUpperCase() || "SPEC-NEW",
      department: progForm.department,
      duration: progForm.duration,
      credits: progForm.credits,
      activeLearners: 0,
      requiredCourses: 4,
      accreditationStatus: "Accredited"
    };
    setPrograms([...programs, newProg]);
    setModalOpen(false);
  };

  return (
    <div className="admin-programs-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Academic Degree & Specialization Programs</h1>
          <p className="student-page-subtitle">
            Accredited micro-credentials, executive specializations, and multi-course professional certifications.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
            <PlusIcon size={16} />
            <span>Create Specialization Track</span>
          </button>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="admin-programs-grid">
        {programs.map((prog) => (
          <div key={prog.id} className="admin-prog-card lms-content-card">
            <div className="dept-header-row">
              <span className="dept-code-badge">{prog.code}</span>
              <span className="status-tag published">{prog.accreditationStatus}</span>
            </div>

            <h3 className="dept-name">{prog.title}</h3>
            <span className="prog-dept-text">{prog.department}</span>

            <div className="prog-meta-strip">
              <span>Duration: <strong>{prog.duration}</strong></span>
              <span>Credits: <strong>{prog.credits} CEUs</strong></span>
              <span>Courses: <strong>{prog.requiredCourses} Required</strong></span>
            </div>

            <div className="dept-footer-row">
              <span>Active Enrolled Cohort:</span>
              <strong className="text-emerald">{prog.activeLearners.toLocaleString()} Scholars</strong>
            </div>
          </div>
        ))}
      </div>

      {/* ADD PROGRAM MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Curriculum Degree</span>
                <h2>Create Specialization Track</h2>
              </div>
              <button type="button" className="btn-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleAddProgram} className="quiz-modal-body">
              <div className="form-group full-width">
                <label>Program Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Professional Cloud DevOps Architecture Track"
                  value={progForm.title}
                  onChange={(e) => setProgForm({ ...progForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: "14px" }}>
                <label>Faculty Department</label>
                <select
                  value={progForm.department}
                  onChange={(e) => setProgForm({ ...progForm, department: e.target.value })}
                >
                  {adminDepartments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                <div className="form-group">
                  <label>Program Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CERT-DEVOPS-2026"
                    value={progForm.code}
                    onChange={(e) => setProgForm({ ...progForm, code: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 Months"
                    value={progForm.duration}
                    onChange={(e) => setProgForm({ ...progForm, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Accredit & Publish Program</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
