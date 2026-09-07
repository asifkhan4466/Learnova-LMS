import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import RatingStars from "../components/RatingStars";
import CourseCard from "../components/CourseCard";
import {
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  UsersIcon,
  AwardIcon,
  GlobeIcon,
  ShieldCheckIcon,
  PlayCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowRightIcon,
  SparklesIcon
} from "../components/Icons";
import { coursesData } from "../data/coursesData";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === id);

  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [enrolled, setEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  if (!course) {
    return (
      <div className="container not-found-wrapper">
        <h2>Course Not Found</h2>
        <p>The course you are looking for does not exist or has been moved.</p>
        <Link to="/courses" className="btn-primary-join">
          Explore All Courses
        </Link>
      </div>
    );
  }

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAllModules = () => {
    const all = {};
    course.curriculum.forEach((_, i) => (all[i] = true));
    setExpandedModules(all);
  };

  const collapseAllModules = () => {
    setExpandedModules({});
  };

  const handleEnroll = () => {
    setEnrolled(true);
    setShowEnrollModal(true);
  };

  // Related courses (same category or general, excluding this one)
  const relatedCourses = coursesData
    .filter((c) => c.id !== course.id)
    .filter((c) => c.category === course.category || c.featured)
    .slice(0, 3);

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="course-details-page">
      {/* TOP HERO SECTION */}
      <section className="course-hero-banner">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="course-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link to="/courses">Courses</Link>
            <span className="crumb-sep">/</span>
            <Link to={`/courses?category=${encodeURIComponent(course.category)}`}>
              {course.category}
            </Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{course.title}</span>
          </nav>

          <div className="course-hero-grid">
            <div className="course-hero-main">
              <div className="course-hero-badges">
                {course.badge && <span className="hero-pill-badge">{course.badge}</span>}
                <span className="hero-pill-level">{course.level} Level</span>
                <span className="hero-pill-org">{course.organization}</span>
              </div>

              <h1 className="course-details-title">{course.title}</h1>
              <p className="course-details-subtitle">{course.subtitle}</p>

              {/* Rating & Students Meta */}
              <div className="course-hero-meta-row">
                <div className="hero-rating-wrap">
                  <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
                </div>
                <span className="meta-sep">•</span>
                <span className="hero-meta-students">
                  <UsersIcon size={16} />
                  {course.students.toLocaleString()} learners enrolled
                </span>
                <span className="meta-sep">•</span>
                <span className="hero-meta-lang">
                  <GlobeIcon size={16} />
                  English (Subtitles available)
                </span>
              </div>

              {/* Instructor Lead */}
              <div className="course-hero-instructor">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="hero-instructor-avatar"
                />
                <div className="hero-instructor-text">
                  <span className="taught-by">Course Instructor:</span>
                  <p className="instructor-title-name">
                    <strong>{course.instructor.name}</strong> — {course.instructor.title}
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING ENROLLMENT CARD (DESKTOP & RESPONSIVE) */}
            <div className="course-enrollment-card-wrapper">
              <div className="enrollment-card">
                <div className="enrollment-card-media">
                  <img src={course.thumbnail} alt={course.title} className="enrollment-card-img" />
                  <div className="play-overlay">
                    <PlayCircleIcon size={48} className="play-icon" />
                    <span>Preview This Course</span>
                  </div>
                </div>

                <div className="enrollment-card-body">
                  <div className="enrollment-price-row">
                    <div className="price-stack">
                      <span className="current-price">${course.price}</span>
                      {course.originalPrice && (
                        <span className="old-price">${course.originalPrice}</span>
                      )}
                    </div>
                    {discountPercent > 0 && (
                      <span className="discount-pill">{discountPercent}% OFF</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className={`btn-enroll-primary ${enrolled ? "enrolled" : ""}`}
                    onClick={handleEnroll}
                  >
                    {enrolled ? "✓ Enrolled in Course" : "Enroll Now"}
                  </button>

                  <div className="guarantee-note">
                    <ShieldCheckIcon size={16} />
                    <span>30-Day Full Money-Back Guarantee</span>
                  </div>

                  {/* Course Includes Checklist */}
                  <div className="enrollment-includes-list">
                    <h4>This Course Includes:</h4>
                    <ul>
                      <li>
                        <ClockIcon size={16} />
                        {course.duration} comprehensive duration
                      </li>
                      <li>
                        <BookOpenIcon size={16} />
                        {course.lessonsCount} interactive lessons & labs
                      </li>
                      <li>
                        <AwardIcon size={16} />
                        Official Accredited Certificate
                      </li>
                      <li>
                        <GlobeIcon size={16} />
                        Lifetime access on desktop and mobile
                      </li>
                      <li>
                        <SparklesIcon size={16} />
                        Live weekly instructor office hours
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT DETAILS */}
      <div className="container course-details-container">
        <div className="course-details-layout">
          <div className="course-details-main-column">
            {/* WHAT YOU WILL LEARN */}
            <section className="details-section learn-box-card">
              <h2 className="details-section-title">What You Will Learn</h2>
              <div className="learn-grid">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="learn-item">
                    <CheckCircleIcon size={20} className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SKILLS GAINED */}
            <section className="details-section">
              <h2 className="details-section-title">Skills You Will Gain</h2>
              <div className="skills-chips-row">
                {course.skillsGained.map((skill, index) => (
                  <span key={index} className="skill-badge-item">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* COURSE DESCRIPTION */}
            <section className="details-section">
              <h2 className="details-section-title">About This Course</h2>
              <div className="description-text">
                <p>{course.description}</p>
                <p>
                  Every module includes downloadable code repositories, test suites, and hands-on coding challenges designed to build your public portfolio. By the end of this course, you will be prepared to architect and deploy production systems with industry best practices.
                </p>
              </div>
            </section>

            {/* CURRICULUM ACCORDION */}
            <section className="details-section curriculum-section">
              <div className="curriculum-header">
                <div>
                  <h2 className="details-section-title">Course Curriculum & Modules</h2>
                  <p className="curriculum-meta">
                    {course.curriculum.length} modules • {course.lessonsCount} lessons • {course.duration}
                  </p>
                </div>
                <div className="curriculum-toggles">
                  <button type="button" onClick={expandAllModules} className="btn-text-toggle">
                    Expand All
                  </button>
                  <span className="toggle-sep">|</span>
                  <button type="button" onClick={collapseAllModules} className="btn-text-toggle">
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="curriculum-accordion">
                {course.curriculum.map((mod, index) => {
                  const isOpen = !!expandedModules[index];
                  return (
                    <div key={index} className={`accordion-module ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="accordion-module-header"
                        onClick={() => toggleModule(index)}
                        aria-expanded={isOpen}
                      >
                        <div className="module-title-wrap">
                          <span className="accordion-chevron">
                            {isOpen ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
                          </span>
                          <span className="module-title-text">{mod.title}</span>
                        </div>
                        <span className="module-duration-badge">{mod.duration}</span>
                      </button>

                      {isOpen && (
                        <div className="accordion-module-body">
                          <ul className="lessons-list">
                            {mod.lessons.map((lesson, lIdx) => (
                              <li key={lIdx} className="lesson-item">
                                <div className="lesson-name-wrap">
                                  <PlayCircleIcon size={16} className="lesson-play-icon" />
                                  <span>{lesson.name}</span>
                                </div>
                                <span className="lesson-duration">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PREREQUISITES */}
            <section className="details-section">
              <h2 className="details-section-title">Prerequisites & Requirements</h2>
              <ul className="prerequisites-list">
                {course.prerequisites.map((req, index) => (
                  <li key={index}>
                    <CheckCircleIcon size={16} className="req-check" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* INSTRUCTOR PROFILE */}
            <section className="details-section instructor-card-section">
              <h2 className="details-section-title">Meet Your Instructor</h2>
              <div className="instructor-full-card">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="instructor-large-avatar"
                />
                <div className="instructor-card-info">
                  <h3 className="instructor-card-name">{course.instructor.name}</h3>
                  <p className="instructor-card-role">{course.instructor.title}</p>
                  <p className="instructor-card-inst">{course.instructor.institution}</p>

                  <div className="instructor-quick-stats">
                    <span className="stat-pill">★ 4.9 Instructor Rating</span>
                    <span className="stat-pill">👥 {course.students.toLocaleString()} Students</span>
                    <span className="stat-pill">📚 4 Specialized Courses</span>
                  </div>

                  <p className="instructor-card-bio">{course.instructor.bio}</p>
                </div>
              </div>
            </section>

            {/* REVIEWS & RATINGS BREAKDOWN */}
            <section className="details-section reviews-section">
              <h2 className="details-section-title">Learner Ratings & Feedback</h2>
              <div className="reviews-score-card">
                <div className="score-big-column">
                  <div className="big-rating-number">{course.rating}</div>
                  <RatingStars rating={course.rating} size={18} showCount={false} />
                  <div className="score-total-reviews">
                    Course Rating • {course.reviewCount.toLocaleString()} reviews
                  </div>
                </div>

                <div className="score-bars-column">
                  {[
                    { stars: 5, pct: 92 },
                    { stars: 4, pct: 6 },
                    { stars: 3, pct: 1 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 }
                  ].map((row) => (
                    <div key={row.stars} className="rating-bar-row">
                      <span className="bar-star-label">{row.stars} stars</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${row.pct}%` }}></div>
                      </div>
                      <span className="bar-percent">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RELATED COURSES */}
        {relatedCourses.length > 0 && (
          <section className="section-related-courses">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">CONTINUE EXPLORING</span>
                <h2 className="section-title">Learners Also Enrolled In</h2>
              </div>
            </div>
            <div className="courses-grid-3">
              {relatedCourses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ENROLLMENT SUCCESS MODAL */}
      {showEnrollModal && (
        <div className="auth-modal-overlay" onClick={() => setShowEnrollModal(false)}>
          <div className="enroll-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="enroll-modal-icon">🎉</div>
            <h3>You are Enrolled in {course.title}!</h3>
            <p>
              Welcome to the cohort! Your student workspace, interactive labs, and syllabus have been initialized.
            </p>
            <div className="modal-course-summary">
              <img src={course.thumbnail} alt={course.title} className="summary-thumb" />
              <div>
                <h4>{course.title}</h4>
                <p>Taught by {course.instructor.name}</p>
                <span className="summary-badge">{course.level} Level • {course.duration}</span>
              </div>
            </div>
            <Link
              to={`/student/course/${course.id}`}
              className="btn-modal-submit"
              style={{ display: "block", textAlign: "center", textDecoration: "none" }}
            >
              Start Learning Now →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
