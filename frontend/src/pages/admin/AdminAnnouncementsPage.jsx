import React, { useState } from "react";
import {
  MegaphoneIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon
} from "../../components/Icons";
import { adminAnnouncements } from "../../data/adminData";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(adminAnnouncements);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    targetAudience: "All Users (Students & Instructors)",
    priority: "Standard",
    content: ""
  });

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      title: form.title,
      targetAudience: form.targetAudience,
      priority: form.priority,
      publishDate: "Just now",
      content: form.content,
      status: "Delivered (Immediate Push)"
    };

    setAnnouncements([newAnn, ...announcements]);
    setModalOpen(false);
    setForm({ title: "", targetAudience: "All Users (Students & Instructors)", priority: "Standard", content: "" });
  };

  return (
    <div className="admin-announcements-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>System Announcements & Broadcast Alerts</h1>
          <p className="student-page-subtitle">
            Publish institutional notices, scheduled maintenance warnings, and academic accreditation bulletins.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
            <PlusIcon size={16} />
            <span>Create System Broadcast</span>
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="announcements-stack">
        {announcements.map((item) => (
          <div key={item.id} className="announcement-card lms-content-card">
            <div className="card-header-flex">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className={`priority-tag ${item.priority.includes("High") ? "high" : "normal"}`}>
                  {item.priority}
                </span>
                <span className="audience-pill">{item.targetAudience}</span>
              </div>
              <span className="text-muted" style={{ fontSize: "12px" }}>Published: {item.publishDate}</span>
            </div>

            <h3 className="announcement-title">{item.title}</h3>
            <p className="announcement-text">{item.content}</p>

            <div className="announcement-footer">
              <span className="delivery-status">
                <CheckCircleIcon size={14} className="text-success" />
                <span>{item.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ANNOUNCEMENT MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">System Alert</span>
                <h2>Draft Platform Announcement</h2>
              </div>
              <button type="button" className="btn-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="quiz-modal-body">
              <div className="form-group full-width">
                <label>Announcement Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Scheduled Infrastructure Maintenance Window"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                <div className="form-group">
                  <label>Target Audience</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
                  >
                    <option value="All Users (Students & Instructors)">All Users (Students & Instructors)</option>
                    <option value="Students Only">Students Only</option>
                    <option value="Instructors Only">Instructors Only</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Severity / Priority Level</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option value="Standard">Standard Bulletin</option>
                    <option value="Important">Important Action Required</option>
                    <option value="High / Critical">High / Critical Alert</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width" style={{ marginTop: "14px" }}>
                <label>Message Content *</label>
                <textarea
                  rows={4}
                  placeholder="Write clear, actionable details for platform users..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  required
                />
              </div>

              <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
