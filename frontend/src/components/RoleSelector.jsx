import React from "react";
import { GraduationCapIcon, BookOpenIcon, ShieldCheckIcon } from "./Icons";

export default function RoleSelector({ selectedRole, onChange }) {
  const roles = [
    { id: "student", label: "Student", desc: "Learn & Earn Certificates", icon: GraduationCapIcon },
    { id: "teacher", label: "Teacher", desc: "Create & Teach Courses", icon: BookOpenIcon },
    { id: "admin", label: "Admin", desc: "Manage Platform & Users", icon: ShieldCheckIcon }
  ];

  return (
    <div className="role-selector-container">
      <label className="role-selector-label">Select Your Account Role</label>
      <div className="role-selector-grid">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = selectedRole === r.id;
          return (
            <button
              key={r.id}
              type="button"
              className={`role-option-card ${isSelected ? "selected" : ""}`}
              onClick={() => onChange(r.id)}
            >
              <div className="role-option-icon">
                <Icon size={18} />
              </div>
              <div className="role-option-text">
                <span className="role-option-name">{r.label}</span>
                <span className="role-option-desc">{r.desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
