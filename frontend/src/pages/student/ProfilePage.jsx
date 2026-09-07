import React, { useState } from "react";
import {
  UsersIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GraduationCapIcon,
  ClockIcon,
  AwardIcon,
  CheckCircleIcon,
  EditIcon,
  SparklesIcon
} from "../../components/Icons";
import { studentProfile, studentStats } from "../../data/studentData";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("info");
  const [profileData, setProfileData] = useState({ ...studentProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification Preferences State
  const [emailNotifications, setEmailNotifications] = useState({
    courseUpdates: true,
    assignmentDeadlines: true,
    quizResults: true,
    weeklyDigest: false,
    promotionalOffers: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggleNotification = (key) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="student-profile-page">
      {/* Profile Header Hero Card */}
      <div className="profile-hero-card lms-content-card">
        <div className="profile-hero-content">
          <div className="profile-avatar-wrap">
            <img src={profileData.avatar} alt={profileData.name} className="profile-hero-avatar" />
            <span className="profile-online-badge" title="Active now"></span>
          </div>

          <div className="profile-hero-details">
            <div className="profile-name-row">
              <h2>{profileData.name}</h2>
              <span className="profile-role-badge">Student Scholar</span>
            </div>
            <p className="profile-headline">{profileData.headline}</p>
            <div className="profile-meta-chips">
              <span className="meta-chip">
                <GraduationCapIcon size={16} />
                <span>{profileData.department}</span>
              </span>
              <span className="meta-chip">
                <MapPinIcon size={16} />
                <span>{profileData.location}</span>
              </span>
              <span className="meta-chip">
                <ClockIcon size={16} />
                <span>Member since {profileData.joinedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Profile Summary Stats */}
        <div className="profile-stats-bar">
          <div className="p-stat-item">
            <span className="p-stat-val">{studentStats.totalHours} hrs</span>
            <span className="p-stat-label">Study Time</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">4 Courses</span>
            <span className="p-stat-label">Enrolled</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">{studentStats.weeklyStreak} Days</span>
            <span className="p-stat-label">Streak</span>
          </div>
          <div className="p-stat-divider"></div>
          <div className="p-stat-item">
            <span className="p-stat-val">{studentStats.certificatesCount}</span>
            <span className="p-stat-label">Certificate</span>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="alert-banner success">
          <CheckCircleIcon size={18} />
          <span>Profile updated successfully! Your public profile and learning records are up to date.</span>
        </div>
      )}

      {/* Profile Navigation Tabs */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            Personal Information
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            Academic & Career Goals
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notification Settings
          </button>
        </div>
      </div>

      {/* TAB 1: PERSONAL INFORMATION */}
      {activeTab === "info" && (
        <form className="profile-form-grid" onSubmit={handleSaveProfile}>
          <div className="profile-form-card lms-content-card">
            <h3>Basic Details</h3>
            <p className="card-subtitle">Manage your personal identification and contact information</p>

            <div className="form-fields-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Institutional Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Location / Timezone</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Professional Headline</label>
              <input
                type="text"
                name="headline"
                value={profileData.headline}
                onChange={handleInputChange}
                placeholder="e.g. Aspiring AI Application Engineer"
              />
            </div>

            <div className="form-group full-width">
              <label>Bio / About Me</label>
              <textarea
                rows={4}
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Share your background and areas of technical interest..."
              />
            </div>
          </div>

          <div className="profile-form-card lms-content-card">
            <h3>Online Presence & Portfolio</h3>
            <p className="card-subtitle">Connect your developer links for instructor peer review</p>

            <div className="form-fields-grid">
              <div className="form-group">
                <label>GitHub Profile</label>
                <input
                  type="text"
                  name="github"
                  value={profileData.github}
                  onChange={handleInputChange}
                  placeholder="github.com/username"
                />
              </div>

              <div className="form-group">
                <label>LinkedIn Profile</label>
                <input
                  type="text"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleInputChange}
                  placeholder="linkedin.com/in/username"
                />
              </div>
            </div>

            <div className="form-submit-row">
              <button type="submit" className="btn btn-primary btn-save-profile">
                Save Profile Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: ACADEMIC & GOALS */}
      {activeTab === "goals" && (
        <div className="profile-form-grid">
          <div className="profile-form-card lms-content-card">
            <h3>Academic Program & Degree Track</h3>
            <p className="card-subtitle">Your declared specialization and institutional affiliation</p>

            <div className="form-fields-grid">
              <div className="form-group">
                <label>Faculty / Department</label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Education Status</label>
                <input
                  type="text"
                  name="education"
                  value={profileData.education}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Target Learning Objective (2026)</label>
              <textarea
                rows={3}
                name="learningGoal"
                value={profileData.learningGoal}
                onChange={handleInputChange}
                placeholder="Describe your upcoming certification and skill goals..."
              />
            </div>

            <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
              Update Academic Goals
            </button>
          </div>

          {/* Skill Matrix */}
          <div className="profile-form-card lms-content-card">
            <h3>Core Competencies & Endorsements</h3>
            <p className="card-subtitle">Skills verified through Learnova coursework</p>

            <div className="skills-badge-collection">
              <span className="skill-pill large">React 19 & Next.js</span>
              <span className="skill-pill large">Node.js Express REST APIs</span>
              <span className="skill-pill large">LangGraph Multi-Agent Architecture</span>
              <span className="skill-pill large">Docker & Containerization</span>
              <span className="skill-pill large">Figma Design Systems (98% High Distinction)</span>
              <span className="skill-pill large">TypeScript & Async Patterns</span>
              <span className="skill-pill large">Vector Databases (Pinecone / Qdrant)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="profile-form-card lms-content-card">
          <h3>Email & Notification Preferences</h3>
          <p className="card-subtitle">Choose what alerts and digest summaries you receive from Learnova</p>

          <div className="notification-toggle-list">
            <div className="notif-toggle-row">
              <div>
                <strong>Course Updates & New Lessons</strong>
                <p>Receive notifications when instructors add new exercises or resources.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.courseUpdates}
                  onChange={() => handleToggleNotification("courseUpdates")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notif-toggle-row">
              <div>
                <strong>Assignment & Lab Deadlines</strong>
                <p>Get timely reminders 48 hours and 24 hours prior to submission deadlines.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.assignmentDeadlines}
                  onChange={() => handleToggleNotification("assignmentDeadlines")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notif-toggle-row">
              <div>
                <strong>Quiz Scores & Grader Feedback</strong>
                <p>Instant notification once your assignments are graded or quizzes evaluated.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.quizResults}
                  onChange={() => handleToggleNotification("quizResults")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notif-toggle-row">
              <div>
                <strong>Weekly Progress Digest</strong>
                <p>Summary of your study hours, streak status, and next scheduled modules.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications.weeklyDigest}
                  onChange={() => handleToggleNotification("weeklyDigest")}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "1.5rem" }}
            onClick={handleSaveProfile}
          >
            Save Notification Preferences
          </button>
        </div>
      )}
    </div>
  );
}
