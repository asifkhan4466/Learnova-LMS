import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import {
  SearchIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  AwardIcon,
  UsersIcon,
  BookOpenIcon,
  GlobeIcon,
  GraduationCapIcon,
  BriefcaseIcon
} from "../components/Icons";
import { coursesData } from "../data/coursesData";
import {
  platformCategories,
  careerPaths,
  platformStats,
  whyLearnovaFeatures,
  learnerTestimonials,
  partnerOrganizations
} from "../data/platformData";

export default function HomePage() {
  const [heroSearch, setHeroSearch] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("career");
  const [activeCareerTab, setActiveCareerTab] = useState("ai-engineer");
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const featuredCourses = coursesData.filter((c) => c.featured);
  const popularCourses = coursesData.filter((c) => c.popular);
  const trendingCourses = coursesData.filter((c) => c.trending);

  const activeCareer = careerPaths.find((c) => c.id === activeCareerTab) || careerPaths[0];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <SparklesIcon size={14} />
              <span>Next-Gen Curriculum • 2026 Ready</span>
            </div>

            <h1 className="hero-title">
              Master Tomorrow's <span className="highlight-text">Tech Skills</span> with Industry-Proven Guidance.
            </h1>

            <p className="hero-subtitle">
              Accelerate your engineering and data career with immersive project curriculums designed by senior practitioners at top tech companies.
            </p>

            {/* Course Search Box */}
            <form onSubmit={handleHeroSearch} className="hero-search-box">
              <SearchIcon size={20} className="hero-search-icon" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="What skill or career do you want to learn? (e.g. AI Agents, Kubernetes)"
                className="hero-search-input"
              />
              <button type="submit" className="hero-search-btn">
                Find Courses
              </button>
            </form>

            {/* Trending Quick Tags */}
            <div className="hero-trending-tags">
              <span className="trending-label">Trending Searches:</span>
              <button type="button" onClick={() => navigate("/courses?search=AI")} className="tag-pill">
                AI Agents
              </button>
              <button type="button" onClick={() => navigate("/courses?search=React")} className="tag-pill">
                React 19
              </button>
              <button type="button" onClick={() => navigate("/courses?search=Kubernetes")} className="tag-pill">
                Kubernetes
              </button>
              <button type="button" onClick={() => navigate("/courses?search=Python")} className="tag-pill">
                Python Data
              </button>
              <button type="button" onClick={() => navigate("/courses?search=Security")} className="tag-pill">
                Ethical Hacking
              </button>
            </div>
          </div>

          {/* Hero Feature Promotion Cards */}
          <div className="hero-visual-cards">
            <div className="hero-promo-card promo-card-primary">
              <div className="promo-badge-tag">Specialization Pass</div>
              <h3>Learnova Pro Career Access</h3>
              <p>Unlock 450+ guided courses, interactive sandboxes, and recognized certificates.</p>
              <div className="promo-discount-badge">30% OFF THIS WEEK</div>
              <Link to="/courses" className="btn-promo-action">
                Explore Programs <ArrowRightIcon size={16} />
              </Link>
            </div>

            <div className="hero-promo-card promo-card-secondary">
              <div className="promo-badge-tag secondary">Enterprise Ready</div>
              <h3>Empower Engineering Teams</h3>
              <p>Tailored upskilling tracks for teams building autonomous AI and scalable cloud platforms.</p>
              <Link to="/contact" className="btn-promo-action secondary">
                Talk to Enterprise <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Partner Ecosystem Bar */}
        <div className="partners-banner">
          <div className="container partners-inner">
            <span className="partners-label">CURRICULUM ACCREDITED & ALIGNED WITH:</span>
            <div className="partners-list">
              {partnerOrganizations.map((org, index) => (
                <span key={index} className="partner-item">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTENT SELECTOR (Inspired by Coursera: What brings you to Learnova today?) */}
      <section className="intent-section">
        <div className="container">
          <div className="intent-wrapper">
            <span className="intent-heading">What brings you to Learnova today?</span>
            <div className="intent-buttons-row">
              <button
                type="button"
                className={`intent-btn ${selectedIntent === "career" ? "active" : ""}`}
                onClick={() => setSelectedIntent("career")}
              >
                <BriefcaseIcon size={18} />
                <span>Launch a New Career</span>
              </button>
              <button
                type="button"
                className={`intent-btn ${selectedIntent === "upskill" ? "active" : ""}`}
                onClick={() => setSelectedIntent("upskill")}
              >
                <SparklesIcon size={18} />
                <span>Grow in My Current Role</span>
              </button>
              <button
                type="button"
                className={`intent-btn ${selectedIntent === "certificate" ? "active" : ""}`}
                onClick={() => setSelectedIntent("certificate")}
              >
                <AwardIcon size={18} />
                <span>Earn Certified Credentials</span>
              </button>
              <button
                type="button"
                className={`intent-btn ${selectedIntent === "degree" ? "active" : ""}`}
                onClick={() => setSelectedIntent("degree")}
              >
                <GraduationCapIcon size={18} />
                <span>Academic Degree Tracks</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="section-categories">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">EXPLORE BY DOMAIN</span>
              <h2 className="section-title">Popular Learning Categories</h2>
            </div>
            <Link to="/courses" className="section-header-link">
              Browse All Categories <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {platformCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <div className="category-card-accent" style={{ backgroundColor: cat.color }}></div>
                <div className="category-card-body">
                  <div className="category-icon-wrapper" style={{ color: cat.color, backgroundColor: `${cat.color}15` }}>
                    <BookOpenIcon size={22} />
                  </div>
                  <h3 className="category-title">{cat.name}</h3>
                  <p className="category-desc">{cat.description}</p>
                  <div className="category-footer">
                    <span className="category-count">{cat.courseCount} Courses</span>
                    <span className="category-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="section-featured-courses">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">HAND-PICKED FOR EXCELLENCE</span>
              <h2 className="section-title">Featured Specializations</h2>
            </div>
            <Link to="/courses" className="section-header-link">
              View All Courses ({coursesData.length}) <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="courses-grid-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW & POPULAR / TRENDING MULTI-COLUMN SHOWCASE (Inspired by Coursera Image 1 & 3) */}
      <section className="section-multi-column">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">REAL-TIME LEADERBOARD</span>
              <h2 className="section-title">New & Trending Programs</h2>
            </div>
          </div>

          <div className="multi-column-grid">
            {/* Column 1: Most Popular */}
            <div className="column-card-box">
              <div className="column-header">
                <h3>Most Popular Courses</h3>
                <Link to="/courses" className="column-more-link">See all →</Link>
              </div>
              <div className="column-items-list">
                {popularCourses.slice(0, 3).map((c) => (
                  <Link key={c.id} to={`/course/${c.id}`} className="column-item-row">
                    <img src={c.thumbnail} alt={c.title} className="column-item-thumb" />
                    <div className="column-item-info">
                      <span className="column-item-cat">{c.category}</span>
                      <h4 className="column-item-title">{c.title}</h4>
                      <div className="column-item-meta">
                        <span className="column-item-rating">★ {c.rating}</span>
                        <span className="column-item-students">({c.students.toLocaleString()} students)</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Trending AI */}
            <div className="column-card-box">
              <div className="column-header">
                <h3>Trending AI & Agents</h3>
                <Link to="/courses?category=Artificial+Intelligence" className="column-more-link">See all →</Link>
              </div>
              <div className="column-items-list">
                {coursesData
                  .filter((c) => c.category === "Artificial Intelligence")
                  .slice(0, 3)
                  .map((c) => (
                    <Link key={c.id} to={`/course/${c.id}`} className="column-item-row">
                      <img src={c.thumbnail} alt={c.title} className="column-item-thumb" />
                      <div className="column-item-info">
                        <span className="column-item-cat">{c.level}</span>
                        <h4 className="column-item-title">{c.title}</h4>
                        <div className="column-item-meta">
                          <span className="column-item-rating">★ {c.rating}</span>
                          <span className="column-item-price">${c.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Column 3: Cloud & Engineering */}
            <div className="column-card-box">
              <div className="column-header">
                <h3>Cloud & Architecture</h3>
                <Link to="/courses?category=Cloud+%26+DevOps" className="column-more-link">See all →</Link>
              </div>
              <div className="column-items-list">
                {coursesData
                  .filter((c) => c.category === "Cloud & DevOps" || c.category === "Software Engineering")
                  .slice(0, 3)
                  .map((c) => (
                    <Link key={c.id} to={`/course/${c.id}`} className="column-item-row">
                      <img src={c.thumbnail} alt={c.title} className="column-item-thumb" />
                      <div className="column-item-info">
                        <span className="column-item-cat">{c.organization}</span>
                        <h4 className="column-item-title">{c.title}</h4>
                        <div className="column-item-meta">
                          <span className="column-item-rating">★ {c.rating}</span>
                          <span className="column-item-price">${c.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE / CAREER PATHWAYS (Inspired by User Screenshot Images 4 & 5) */}
      <section className="section-career-paths">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">CAREER ROADMAPS</span>
            <h2 className="section-title">Prepare for In-Demand High-Growth Roles</h2>
            <p className="section-desc">
              Structured multi-course paths designed to take you from foundational understanding to job-ready mastery.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="career-tabs-bar">
            {careerPaths.map((path) => (
              <button
                key={path.id}
                type="button"
                className={`career-tab-btn ${activeCareerTab === path.id ? "active" : ""}`}
                onClick={() => setActiveCareerTab(path.id)}
              >
                {path.role}
              </button>
            ))}
          </div>

          {/* Active Role Showcase Box */}
          <div className="career-showcase-card">
            <div className="career-showcase-grid">
              <div className="career-info-side">
                <div className="career-badges-row">
                  <span className="career-stat-badge">Average Salary: {activeCareer.avgSalary}</span>
                  <span className="career-growth-badge">{activeCareer.growth} Demand</span>
                </div>
                <h3 className="career-role-title">{activeCareer.role} Specialization Track</h3>
                <p className="career-role-desc">{activeCareer.description}</p>

                <div className="career-skills-block">
                  <span className="skills-block-title">Key Technologies You Master:</span>
                  <div className="skills-tag-wrap">
                    {activeCareer.skills.map((skill, idx) => (
                      <span key={idx} className="skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="career-mentor-row">
                  <img src={activeCareer.avatar} alt={activeCareer.mentor} className="career-mentor-avatar" />
                  <div>
                    <span className="mentor-label">Track Lead Mentor:</span>
                    <p className="mentor-name">{activeCareer.mentor}</p>
                  </div>
                </div>

                <div className="career-cta-row">
                  <Link to="/courses" className="btn-career-action">
                    Explore {activeCareer.role} Courses ({activeCareer.courseCount}) <ArrowRightIcon size={16} />
                  </Link>
                </div>
              </div>

              <div className="career-preview-side">
                <div className="curriculum-preview-box">
                  <h4>Included In This Track:</h4>
                  <ul className="track-checklist">
                    <li><CheckCircleIcon size={18} className="check-icon" /> Full portfolio capstone project with production deployment</li>
                    <li><CheckCircleIcon size={18} className="check-icon" /> 1-on-1 resume audit & interview preparation with senior engineers</li>
                    <li><CheckCircleIcon size={18} className="check-icon" /> Direct access to verified hiring partner talent network</li>
                    <li><CheckCircleIcon size={18} className="check-icon" /> Accredited completion certificate with digital verification link</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY LEARNOVA */}
      <section className="section-why-learnova">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">THE LEARNOVA DIFFERENCE</span>
            <h2 className="section-title">Why Ambitious Builders Choose Learnova</h2>
            <p className="section-desc">
              We redesigned online technical education around real engineering feedback, practical cloud environments, and measurable outcomes.
            </p>
          </div>

          <div className="why-features-grid">
            {whyLearnovaFeatures.map((feat, index) => (
              <div key={index} className="why-feature-card">
                <div className="why-feature-number">0{index + 1}</div>
                <div className="why-badge">{feat.badge}</div>
                <h3 className="why-title">{feat.title}</h3>
                <p className="why-desc">{feat.description}</p>
              </div>
            ))}
          </div>

          {/* STAT BANNER (Inspired by Coursera Image 5: 91% positive outcome) */}
          <div className="stats-impact-banner">
            <div className="stats-impact-content">
              <div className="stat-big-number">92%</div>
              <div className="stat-big-text">
                <h3>of Learnova graduates achieved a positive career outcome</h3>
                <p>Learners reported promotions, career transitions into high-growth tech roles, or measurable salary increases within six months of completing their track.</p>
              </div>
            </div>
            <div className="stats-grid-row">
              {platformStats.map((st, i) => (
                <div key={i} className="mini-stat-card">
                  <div className="mini-stat-val">{st.value}</div>
                  <div className="mini-stat-lbl">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Inspired by Coursera Image 5: Why people choose Coursera) */}
      <section className="section-testimonials">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">REAL STORIES, REAL IMPACT</span>
              <h2 className="section-title">From Our Learner Community</h2>
            </div>
          </div>

          <div className="testimonials-grid">
            {learnerTestimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h4 className="testimonial-name">{t.name}</h4>
                    <p className="testimonial-role">{t.role}</p>
                    <span className="testimonial-prev">Transitioned from: {t.prevRole}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="section-cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-card-content">
              <span className="cta-badge">START LEARNING TODAY</span>
              <h2 className="cta-heading">Ready to Accelerate Your Tech Career?</h2>
              <p className="cta-subheading">
                Join thousands of software engineers, architects, and AI builders mastering the modern stack. Get started for free today.
              </p>
              <div className="cta-buttons-row">
                <Link to="/courses" className="btn-cta-primary">
                  Browse All Courses
                </Link>
                <Link to="/contact" className="btn-cta-secondary">
                  Contact Learnova Advisory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
