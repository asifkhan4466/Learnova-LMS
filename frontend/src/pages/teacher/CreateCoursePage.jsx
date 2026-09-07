import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon
} from "../../components/Icons";

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "Artificial Intelligence",
    level: "Intermediate",
    language: "English (US)",
    price: "79.99",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  });

  const [outcomes, setOutcomes] = useState([
    "Architect autonomous agents with structured tool calling & validation guardrails",
    "Construct cyclic multi-agent supervisors using LangGraph state graphs"
  ]);
  const [newOutcome, setNewOutcome] = useState("");

  const [prerequisites, setPrerequisites] = useState([
    "Solid understanding of Python 3.10+ async syntax",
    "Familiarity with REST APIs and basic machine learning concepts"
  ]);
  const [newPrereq, setNewPrereq] = useState("");

  const [submittedStatus, setSubmittedStatus] = useState(null); // 'draft' or 'published'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOutcome = (e) => {
    e.preventDefault();
    if (newOutcome.trim()) {
      setOutcomes([...outcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleRemoveOutcome = (index) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const handleAddPrereq = (e) => {
    e.preventDefault();
    if (newPrereq.trim()) {
      setPrerequisites([...prerequisites, newPrereq.trim()]);
      setNewPrereq("");
    }
  };

  const handleRemovePrereq = (index) => {
    setPrerequisites(prerequisites.filter((_, i) => i !== index));
  };

  const handleSubmit = (status) => {
    if (!formData.title) {
      alert("Please enter a course title");
      return;
    }
    setSubmittedStatus(status);
    setTimeout(() => {
      // Navigate to course builder
      navigate("/teacher/courses");
    }, 2000);
  };

  return (
    <div className="teacher-create-course-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Create New Course Curriculum</h1>
          <p className="student-page-subtitle">
            Configure syllabus metadata, targeted outcomes, prerequisites, and pricing before adding modules in the Course Builder.
          </p>
        </div>
        <div className="header-actions-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleSubmit("draft")}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit("published")}
          >
            Publish Course
          </button>
        </div>
      </div>

      {submittedStatus && (
        <div className="alert-banner success">
          <CheckCircleIcon size={20} />
          <div>
            <strong>Course successfully {submittedStatus === "published" ? "published" : "saved as draft"}!</strong>
            <p>Redirecting to your course library...</p>
          </div>
        </div>
      )}

      <div className="create-course-grid">
        {/* Left: Form Fields */}
        <div className="create-form-column">
          {/* Section 1: Basic Information */}
          <div className="lms-content-card">
            <h3>1. Course Information</h3>
            <p className="card-subtitle">General identification for learners browsing the Learnova catalog</p>

            <div className="form-fields-stack">
              <div className="form-group full-width">
                <label>Course Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Next-Gen Autonomous AI Agents with LangGraph"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Subtitle / One-line Pitch</label>
                <input
                  type="text"
                  name="subtitle"
                  placeholder="e.g. Master multi-agent orchestration, self-healing tool loops, and hybrid RAG"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-fields-grid">
                <div className="form-group">
                  <label>Primary Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Target Proficiency Level</label>
                  <select name="level" value={formData.level} onChange={handleInputChange}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="form-fields-grid">
                <div className="form-group">
                  <label>Instructional Language</label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Course Price (USD $)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Comprehensive Course Description</label>
                <textarea
                  rows={5}
                  name="description"
                  placeholder="Describe what makes this course unique, key capstone projects, and industry relevance..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Learning Outcomes */}
          <div className="lms-content-card">
            <h3>2. What Students Will Learn</h3>
            <p className="card-subtitle">Key technical competencies learners acquire after finishing this course</p>

            <div className="dynamic-items-list">
              {outcomes.map((item, idx) => (
                <div key={idx} className="dynamic-bullet-row">
                  <span className="bullet-dot">✓</span>
                  <span className="bullet-text">{item}</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => handleRemoveOutcome(idx)}
                    title="Remove outcome"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="add-item-row">
              <input
                type="text"
                placeholder="Add a new learning outcome..."
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddOutcome(e); }}
              />
              <button type="button" className="btn btn-secondary" onClick={handleAddOutcome}>
                <PlusIcon size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Section 3: Prerequisites */}
          <div className="lms-content-card">
            <h3>3. Requirements & Prerequisites</h3>
            <p className="card-subtitle">Expected baseline tools, languages, or prior experience</p>

            <div className="dynamic-items-list">
              {prerequisites.map((item, idx) => (
                <div key={idx} className="dynamic-bullet-row">
                  <span className="bullet-dot">•</span>
                  <span className="bullet-text">{item}</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => handleRemovePrereq(idx)}
                    title="Remove prerequisite"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="add-item-row">
              <input
                type="text"
                placeholder="Add a new prerequisite..."
                value={newPrereq}
                onChange={(e) => setNewPrereq(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddPrereq(e); }}
              />
              <button type="button" className="btn btn-secondary" onClick={handleAddPrereq}>
                <PlusIcon size={16} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Media & Thumbnail Preview */}
        <div className="create-sidebar-column">
          <div className="lms-content-card sticky-card">
            <h3>Course Media & Card Preview</h3>
            <p className="card-subtitle">Learners will see this card when searching the catalog</p>

            <div className="form-group" style={{ marginTop: "14px" }}>
              <label>Thumbnail Image URL</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
              />
            </div>

            {/* Live Card Mockup */}
            <div className="card-preview-container">
              <div className="preview-label">Live Preview</div>
              <div className="course-card preview-card">
                <div className="course-card-image-wrap">
                  <img
                    src={formData.thumbnail || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"}
                    alt="Course Preview"
                    className="course-card-image"
                  />
                  <span className="course-badge preview">{formData.category}</span>
                </div>
                <div className="course-card-content">
                  <h4 className="course-card-title">{formData.title || "Untitled Curriculum Title"}</h4>
                  <p className="course-card-desc">{formData.subtitle || "Brief course overview pitch will appear here..."}</p>
                  <div className="course-card-footer">
                    <span className="course-price">${formData.price || "0.00"}</span>
                    <span className="btn-enroll-preview">Preview</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="submit-action-box">
              <button
                type="button"
                className="btn btn-primary full-width"
                onClick={() => handleSubmit("published")}
              >
                Publish Curriculum
              </button>
              <button
                type="button"
                className="btn btn-secondary full-width"
                onClick={() => handleSubmit("draft")}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
