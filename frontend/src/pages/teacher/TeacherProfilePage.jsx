import React, { useState } from "react";
import {
  UsersIcon,
  AwardIcon,
  BookOpenIcon,
  StarIcon,
  MapPinIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  PlusIcon,
  TrashIcon
} from "../../components/Icons";
import { teacherProfile, teacherStats } from "../../data/teacherData";

export default function TeacherProfilePage() {
  const [profile, setProfile] = useState({ ...teacherProfile });
  const [expertiseList, setExpertiseList] = useState([...teacherProfile.expertise]);
  const [newSkill, setNewSkill] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !expertiseList.includes(newSkill.trim())) {
      setExpertiseList([...expertiseList, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill) => {
    setExpertiseList(expertiseList.filter((s) => s !== skill));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="teacher-profile-page">
      {/* Profile Hero Card */}
      <div className="profile-hero-card lms-content-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrap">
            <img src={profile.avatar} alt={profile.name} className="profile-hero-avatar teacher-avatar" />
            <span className="profile-online-badge teacher" title="Instructor Active"></span>
          </div>

          <div className="profile-hero-details">
            <div className="profile-name-row">
              <h2>{profile.name}</h2>
              <span className="profile-role-badge teacher">Lead AI Faculty</span>
            </div>
            <p className="profile-headline">{profile.headline}</p>
            <div className="profile-meta-chips">
              <span className="meta-chip">
                <BookOpenIcon size={16} />
                <span>{profile.department}</span>
              </span>
              <span className="meta-chip">
                <MapPinIcon size={16} />
                <span>{profile.location}</span>
              </span>
              <span className="meta-chip">
                <StarIcon size={16} filled={true} />
                <span>{teacherStats.overallRating} ★ Overall Rating</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Instructor Metrics Bar */}
        <div className="profile-stats-bar">
          <div className="p-stat-item">
            <span className="p-stat-val">{teacherStats.totalStudents.toLocaleString()}</span>
            <span className="p-stat-label">Total Learners</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">{teacherStats.publishedCourses} Courses</span>
            <span className="p-stat-label">Published</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">${teacherStats.monthlyEarnings.toLocaleString()}</span>
            <span className="p-stat-label">Monthly Payout</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">{teacherStats.ratingCount.toLocaleString()}</span>
            <span className="p-stat-label">Verified Reviews</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="alert-banner success">
          <CheckCircleIcon size={20} />
          <span>Instructor public profile, research biography, and credentials updated successfully!</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSaveProfile} className="profile-form-grid">
        {/* Basic Identity Information */}
        <div className="profile-form-card lms-content-card">
          <h3>Faculty Identity & Institutional Contact</h3>
          <p className="card-subtitle">Manage how your name and affiliation appear across course certificates and syllabus pages</p>

          <div className="form-fields-grid">
            <div className="form-group">
              <label>Full Academic Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Faculty Role / Title *</label>
              <input
                type="text"
                name="role"
                value={profile.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Institutional Email *</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Direct Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group full-width" style={{ marginTop: "14px" }}>
            <label>School or Department</label>
            <input
              type="text"
              name="department"
              value={profile.department}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group full-width" style={{ marginTop: "14px" }}>
            <label>Professional Headline</label>
            <input
              type="text"
              name="headline"
              value={profile.headline}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group full-width" style={{ marginTop: "14px" }}>
            <label>Comprehensive Instructor Biography</label>
            <textarea
              rows={5}
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Teaching Expertise & Research Focus */}
        <div className="profile-form-card lms-content-card">
          <h3>Teaching Expertise & Core Domains</h3>
          <p className="card-subtitle">Tags displayed on your public course cards and teacher badge</p>

          <div className="skills-badge-collection" style={{ marginBottom: "16px" }}>
            {expertiseList.map((skill) => (
              <span key={skill} className="skill-pill large teacher-skill-pill">
                <span>{skill}</span>
                <button
                  type="button"
                  className="btn-remove-skill"
                  onClick={() => handleRemoveSkill(skill)}
                  title="Remove skill"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="add-item-row" style={{ maxWidth: "480px" }}>
            <input
              type="text"
              placeholder="Add technical domain (e.g. Distributed Consensus)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleAddSkill(e); }}
            />
            <button type="button" className="btn btn-secondary" onClick={handleAddSkill}>
              <PlusIcon size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Academic Links & Developer Profiles */}
        <div className="profile-form-card lms-content-card">
          <h3>Academic Links & Scholarly Profiles</h3>
          <p className="card-subtitle">Connect your research profiles for student verification and lab repositories</p>

          <div className="form-fields-grid">
            <div className="form-group">
              <label>Personal / Lab Website</label>
              <input
                type="text"
                value={profile.socialLinks?.website || ""}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, website: e.target.value } })}
              />
            </div>

            <div className="form-group">
              <label>GitHub Organization / Profile</label>
              <input
                type="text"
                value={profile.socialLinks?.github || ""}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn Profile</label>
              <input
                type="text"
                value={profile.socialLinks?.linkedin || ""}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
              />
            </div>

            <div className="form-group">
              <label>Google Scholar Profile</label>
              <input
                type="text"
                value={profile.socialLinks?.scholar || ""}
                onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, scholar: e.target.value } })}
              />
            </div>
          </div>

          <div className="form-submit-row" style={{ marginTop: "24px" }}>
            <button type="submit" className="btn btn-primary btn-save-profile">
              Save Instructor Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
