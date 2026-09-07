import React, { useState } from "react";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  LockIcon,
  KeyIcon
} from "../../components/Icons";
import { adminProfile } from "../../data/adminData";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({ ...adminProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="admin-profile-page">
      {/* Hero Card */}
      <div className="profile-hero-card lms-content-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrap">
            <img src={profile.avatar} alt={profile.name} className="profile-hero-avatar admin-avatar" />
            <span className="profile-online-badge admin" title="Root Session Active"></span>
          </div>

          <div className="profile-hero-details">
            <div className="profile-name-row">
              <h2>{profile.name}</h2>
              <span className="profile-role-badge admin">Superuser / Root Authority</span>
            </div>
            <p className="profile-headline">{profile.role}</p>
            <div className="profile-meta-chips">
              <span className="meta-chip">
                <ShieldCheckIcon size={16} />
                <span>Security Clearance: {profile.securityClearance}</span>
              </span>
              <span className="meta-chip">
                <LockIcon size={16} />
                <span>2FA: Enforced (Yubikey Hardware FIDO2)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="profile-stats-bar">
          <div className="p-stat-item">
            <span className="p-stat-val text-emerald">Level 5</span>
            <span className="p-stat-label">Clearance</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">192.168.1.104</span>
            <span className="p-stat-label">Authorized Whitelisted IP</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">Full Read/Write</span>
            <span className="p-stat-label">Cluster Permissions</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert-banner success">
          <CheckCircleIcon size={18} />
          <span>Root administrator profile and audit keys saved successfully!</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="profile-form-grid">
        <div className="profile-form-card lms-content-card">
          <h3>Administrator Credentials & Notification Dispatch</h3>
          <p className="card-subtitle">Manage superuser contact records and platform audit notifications</p>

          <div className="form-fields-grid" style={{ marginTop: "16px" }}>
            <div className="form-group">
              <label>Full Administrative Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Institutional Security Role *</label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Primary Emergency Dispatch Email *</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Direct Emergency Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-submit-row" style={{ marginTop: "20px" }}>
            <button type="submit" className="btn btn-primary">
              Save Admin Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
