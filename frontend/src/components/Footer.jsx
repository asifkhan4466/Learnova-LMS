import React from "react";
import { Link } from "react-router-dom";
import { GlobeIcon, SparklesIcon } from "./Icons";
import { platformCategories } from "../data/platformData";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-section">
        <div className="footer-container footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <img src="/images/Logo.png" alt="Learnova" className="footer-logo-img" />
              <span className="footer-brand-name">Learnova</span>
            </Link>
            <p className="footer-mission-text">
              Learnova is the modern learning management ecosystem empowering individuals, universities, and enterprise teams with mastery in AI, Cloud Architecture, Full-Stack Engineering, and Data Science.
            </p>
            <div className="footer-badges-row">
              <span className="footer-badge">
                <SparklesIcon size={14} />
                Accredited Curriculum
              </span>
              <span className="footer-badge">
                <GlobeIcon size={14} />
                Global Learner Network
              </span>
            </div>
          </div>

          {/* Top Categories */}
          <div className="footer-col">
            <h4 className="footer-heading">Top Categories</h4>
            <ul className="footer-links-list">
              {platformCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/courses?category=${encodeURIComponent(cat.name)}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Learning Programs</h4>
            <ul className="footer-links-list">
              <li><Link to="/courses">Browse All Courses</Link></li>
              <li><Link to="/courses?level=Beginner">Beginner Career Tracks</Link></li>
              <li><Link to="/courses?level=Intermediate">Professional Certificates</Link></li>
              <li><Link to="/courses?level=Advanced">Mastery Specializations</Link></li>
              <li><Link to="/about">Why Choose Learnova</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Company & Help</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/about">Leadership & Advisory</Link></li>
              <li><Link to="/contact">Enterprise Partnerships</Link></li>
              <li><Link to="/contact">Help Center & FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-section">
        <div className="footer-container footer-bottom-inner">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Learnova Inc. All rights reserved. Built for learners worldwide.
          </div>
          <div className="footer-legal-links">
            <span className="legal-link">Privacy Policy</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Terms of Service</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Security Guidelines</span>
            <span className="legal-dot">•</span>
            <span className="legal-link">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
