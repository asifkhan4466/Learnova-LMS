import React, { useState } from "react";
import {
  LayersIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CheckCircleIcon,
  UsersIcon,
  BookOpenIcon
} from "../../components/Icons";
import { adminDepartments } from "../../data/adminData";

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState(adminDepartments);
  const [activeModal, setActiveModal] = useState(false);
  const [deptForm, setDeptForm] = useState({ name: "", code: "", headOfDepartment: "", budget: "$500,000" });

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!deptForm.name) return;
    const newD = {
      id: `dept-${Date.now()}`,
      name: deptForm.name,
      code: deptForm.code.toUpperCase() || "NEW-DEPT",
      headOfDepartment: deptForm.headOfDepartment || "Faculty Lead",
      facultyCount: 5,
      coursesCount: 10,
      studentsEnrolled: 0,
      budget: deptForm.budget
    };
    setDepartments([...departments, newD]);
    setActiveModal(false);
    setDeptForm({ name: "", code: "", headOfDepartment: "", budget: "$500,000" });
  };

  const handleDeleteDept = (id) => {
    if (confirm("Delete this academic department?")) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="admin-departments-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Academic Faculties & Departments</h1>
          <p className="student-page-subtitle">
            Structure academic disciplines, assign department chairs, and allocate instructional computing budgets.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-primary" onClick={() => setActiveModal(true)}>
            <PlusIcon size={16} />
            <span>Add Faculty Department</span>
          </button>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="admin-dept-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="admin-dept-card lms-content-card">
            <div className="dept-header-row">
              <span className="dept-code-badge">{dept.code}</span>
              <button
                type="button"
                className="btn-remove-item"
                onClick={() => handleDeleteDept(dept.id)}
                title="Delete department"
              >
                <TrashIcon size={14} />
              </button>
            </div>

            <h3 className="dept-name">{dept.name}</h3>
            <span className="dept-head">Chair: <strong>{dept.headOfDepartment}</strong></span>

            <div className="dept-stats-row">
              <div className="dept-stat-box">
                <span className="dept-stat-num">{dept.facultyCount}</span>
                <span className="dept-stat-lbl">Faculty</span>
              </div>
              <div className="dept-stat-box">
                <span className="dept-stat-num">{dept.coursesCount}</span>
                <span className="dept-stat-lbl">Curriculums</span>
              </div>
              <div className="dept-stat-box">
                <span className="dept-stat-num">{dept.studentsEnrolled.toLocaleString()}</span>
                <span className="dept-stat-lbl">Learners</span>
              </div>
            </div>

            <div className="dept-footer-row">
              <span>Operating Budget:</span>
              <strong className="text-emerald">{dept.budget}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* ADD DEPARTMENT MODAL */}
      {activeModal && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Academic Structure</span>
                <h2>Add Academic Department</h2>
              </div>
              <button type="button" className="btn-modal-close" onClick={() => setActiveModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddDept} className="quiz-modal-body">
              <div className="form-group full-width">
                <label>Department Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Applied Quantum Computing & Quantum Information"
                  value={deptForm.name}
                  onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                <div className="form-group">
                  <label>Department Code</label>
                  <input
                    type="text"
                    placeholder="e.g. QUANT-SYS"
                    value={deptForm.code}
                    onChange={(e) => setDeptForm({ ...deptForm, code: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Chair / Head of Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jane Doe"
                    value={deptForm.headOfDepartment}
                    onChange={(e) => setDeptForm({ ...deptForm, headOfDepartment: e.target.value })}
                  />
                </div>
              </div>

              <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Department</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
