import React, { useState } from "react";
import {
  SettingsIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  LockIcon,
  MailIcon
} from "../../components/Icons";
import { adminSettings } from "../../data/adminData";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({ ...adminSettings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="admin-settings-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Platform Governance & Infrastructure Settings</h1>
          <p className="student-page-subtitle">
            Configure system-wide authentication policies, registration controls, security boundaries, and email delivery routes.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert-banner success" style={{ marginBottom: "20px" }}>
          <CheckCircleIcon size={18} />
          <span>Platform configuration updated and propagated across all cluster nodes!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="settings-forms-stack">
        {/* General Settings */}
        <div className="lms-content-card">
          <h3>General Platform Settings</h3>
          <p className="card-subtitle">Public institutional identification and administrative contact</p>

          <div className="form-fields-grid" style={{ marginTop: "16px" }}>
            <div className="form-group">
              <label>Platform Name</label>
              <input
                type="text"
                name="platformName"
                value={settings.platformName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Institutional Domain</label>
              <input
                type="text"
                name="domain"
                value={settings.domain}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Support Desk Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Max Video Upload Size (MB)</label>
              <input
                type="number"
                name="maxFileUploadSizeMB"
                value={settings.maxFileUploadSizeMB}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="lms-content-card">
          <h3>Security & Authentication Policies</h3>
          <p className="card-subtitle">Enforce multi-factor verification and session limits</p>

          <div className="notification-toggle-list" style={{ marginTop: "16px" }}>
            <div className="notif-toggle-row">
              <div>
                <strong>Enforce 2FA for Instructors</strong>
                <p>Require hardware or TOTP authentication on all instructor accounts before publishing courses.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="enforce2FAForInstructors"
                  checked={settings.enforce2FAForInstructors}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notif-toggle-row">
              <div>
                <strong>Enforce 2FA for Administrators</strong>
                <p>Strict Level 5 security mandate for any user accessing the Admin Console.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="enforce2FAForAdmins"
                  checked={settings.enforce2FAForAdmins}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notif-toggle-row">
              <div>
                <strong>Automated Code Plagiarism Scanning</strong>
                <p>Analyze student code submissions with AST similarity hashing against public repositories.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="enablePlagiarismDetection"
                  checked={settings.enablePlagiarismDetection}
                  onChange={handleInputChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="form-submit-row">
          <button type="submit" className="btn btn-primary">
            Save Platform Settings
          </button>
        </div>
      </form>
    </div>
  );
}
