import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { SearchIcon, ChevronDownIcon, MenuIcon, XIcon, SparklesIcon } from "./Icons";
import { platformCategories } from "../data/platformData";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'signup' | null
  const [activeAudience, setActiveAudience] = useState("individuals");
  const exploreRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExploreOpen(false);
  }, [location]);

  // Click outside to close explore dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="site-header">
        {/* Top Utility Ribbon */}
        <div className="top-ribbon">
          <div className="header-container top-ribbon-content">
            <div className="ribbon-audience-tabs">
              <button
                type="button"
                className={`ribbon-tab ${activeAudience === "individuals" ? "active" : ""}`}
                onClick={() => setActiveAudience("individuals")}
              >
                For Individuals
              </button>
              <button
                type="button"
                className={`ribbon-tab ${activeAudience === "teams" ? "active" : ""}`}
                onClick={() => setActiveAudience("teams")}
              >
                For Teams
              </button>
              <button
                type="button"
                className={`ribbon-tab ${activeAudience === "universities" ? "active" : ""}`}
                onClick={() => setActiveAudience("universities")}
              >
                For Universities
              </button>
              <button
                type="button"
                className={`ribbon-tab ${activeAudience === "governments" ? "active" : ""}`}
                onClick={() => setActiveAudience("governments")}
              >
                For Governments
              </button>
            </div>
            <div className="ribbon-right-links">
              <span className="ribbon-link-badge">
                <SparklesIcon size={13} />
                New: AI Agent Specializations
              </span>
              <Link to="/about" className="ribbon-link">Why Learnova</Link>
              <Link to="/contact" className="ribbon-link">Support</Link>
              <Link to="/login" className="ribbon-link" style={{ fontWeight: 700, color: "var(--color-primary-blue, #1366f7)" }}>Role Portals ↗</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav className="main-navbar">
          <div className="header-container navbar-inner">
            {/* Logo Brand */}
            <Link to="/" className="brand-logo-link" aria-label="Learnova Home">
              <img src="/images/Logo.png" alt="Learnova" className="brand-logo-img" />
              <span className="brand-title">Learnova</span>
            </Link>

            {/* Explore Dropdown */}
            <div className="explore-menu-wrapper" ref={exploreRef}>
              <button
                type="button"
                className={`btn-explore ${exploreOpen ? "active" : ""}`}
                onClick={() => setExploreOpen(!exploreOpen)}
                aria-expanded={exploreOpen}
              >
                <span>Explore</span>
                <ChevronDownIcon size={14} className={`chevron-icon ${exploreOpen ? "rotate" : ""}`} />
              </button>

              {exploreOpen && (
                <div className="explore-dropdown-menu">
                  <div className="explore-dropdown-header">
                    <span className="dropdown-heading">Top Learning Paths</span>
                    <Link to="/courses" className="view-all-link" onClick={() => setExploreOpen(false)}>
                      View All Courses →
                    </Link>
                  </div>
                  <div className="explore-categories-grid">
                    {platformCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/courses?category=${encodeURIComponent(cat.name)}`}
                        className="explore-cat-item"
                        onClick={() => setExploreOpen(false)}
                      >
                        <div className="explore-cat-bar" style={{ backgroundColor: cat.color }}></div>
                        <div className="explore-cat-details">
                          <span className="explore-cat-name">{cat.name}</span>
                          <span className="explore-cat-count">{cat.courseCount} Courses</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="navbar-search-form">
              <SearchIcon size={17} className="search-input-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn?"
                className="navbar-search-input"
                aria-label="Search courses"
              />
              <button type="submit" className="navbar-search-btn" aria-label="Submit search">
                Search
              </button>
            </form>

            {/* Desktop Nav Links */}
            <div className="navbar-nav-links">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Home
              </NavLink>
              <NavLink to="/courses" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Courses
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                Contact
              </NavLink>
            </div>

            {/* Auth Actions */}
            <div className="navbar-auth-actions">
              <Link to="/login" className="btn-text-auth">
                Log In
              </Link>
              <Link to="/register" className="btn-primary-join">
                Join for Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="mobile-nav-drawer">
              <form onSubmit={handleSearchSubmit} className="mobile-search-form">
                <SearchIcon size={17} className="search-input-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, skills, topics..."
                  className="mobile-search-input"
                />
                <button type="submit" className="mobile-search-btn">Search</button>
              </form>

              <div className="mobile-nav-links-list">
                <NavLink to="/" end className="mobile-nav-item">Home</NavLink>
                <NavLink to="/courses" className="mobile-nav-item">All Courses</NavLink>
                <NavLink to="/about" className="mobile-nav-item">About Learnova</NavLink>
                <NavLink to="/contact" className="mobile-nav-item">Contact & Support</NavLink>
              </div>

              <div className="mobile-categories-section">
                <div className="mobile-cat-title">Explore Categories</div>
                <div className="mobile-cat-tags">
                  {platformCategories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/courses?category=${encodeURIComponent(cat.name)}`}
                      className="mobile-cat-chip"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="btn-text-auth full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary-join full-width"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join for Free
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Demo Modal for Sign In / Join */}
      {authModal && (
        <div className="auth-modal-overlay" onClick={() => setAuthModal(null)}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={() => setAuthModal(null)}>
              <XIcon size={20} />
            </button>
            <div className="auth-modal-header">
              <img src="/images/Logo.png" alt="Learnova" className="auth-modal-logo" />
              <h3>{authModal === "login" ? "Welcome Back to Learnova" : "Create Your Free Account"}</h3>
              <p>
                {authModal === "login"
                  ? "Access your courses, certificates, and learning path."
                  : "Start learning from top instructors and industry leaders."}
              </p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setAuthModal(null); }} className="auth-form">
              {authModal === "signup" && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Jane Doe" required />
                </div>
              )}
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button type="submit" className="btn-modal-submit">
                {authModal === "login" ? "Sign In" : "Sign Up for Free"}
              </button>
              <div className="auth-modal-footer">
                {authModal === "login" ? (
                  <span>Don't have an account? <button type="button" onClick={() => setAuthModal("signup")} className="auth-switch-btn">Sign up</button></span>
                ) : (
                  <span>Already have an account? <button type="button" onClick={() => setAuthModal("login")} className="auth-switch-btn">Log in</button></span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

