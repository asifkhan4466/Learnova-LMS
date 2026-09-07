import React from "react";
import { Link } from "react-router-dom";
import {
  SparklesIcon,
  AwardIcon,
  CheckCircleIcon,
  UsersIcon,
  GlobeIcon,
  GraduationCapIcon,
  ArrowRightIcon
} from "../components/Icons";
import { platformStats, partnerOrganizations } from "../data/platformData";

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: "Dr. Elena Vance",
      role: "Chief Academic Officer & AI Research Fellow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Former ML research director with 15+ peer-reviewed papers on transformer attention mechanisms and agentic system safety."
    },
    {
      name: "Marcus Chen",
      role: "VP of Engineering Curriculum",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Veteran software architect who scaled high-concurrency distributed systems at tier-1 tech firms."
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Cloud & Enterprise Programs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      bio: "Distinguished cloud strategist and AWS community hero guiding enterprise modernization programs."
    },
    {
      name: "Dr. Rajesh Kothari",
      role: "Director of Data Science & Learning Analytics",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "Data science pioneer dedicated to evidence-based learning pedagogy and interactive statistical modeling."
    }
  ];

  const coreValues = [
    {
      icon: "🎯",
      title: "Real-World Practical Mastery",
      description: "We don't teach passive syntax. Every Learnova track centers on hands-on browser labs, production architectures, and real debugging scenarios."
    },
    {
      icon: "⚡",
      title: "Engineering Rigor & Currency",
      description: "Our curriculums are continuously updated alongside technology releases (like React 19 and autonomous LLM agents) to ensure immediate industry relevance."
    },
    {
      icon: "🌍",
      title: "Radical Accessibility",
      description: "We believe exceptional technical education should be available to builders across every continent, background, and career phase."
    },
    {
      icon: "🤝",
      title: "Outcomes First Pedagogy",
      description: "Success at Learnova isn't measured in course completions; it is measured in promotions, career transitions, and products shipped."
    }
  ];

  return (
    <div className="about-page">
      {/* ABOUT HERO */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <span className="about-badge">ABOUT LEARNOVA</span>
            <h1 className="about-hero-title">
              Empowering the Next Generation of <span className="highlight-text">Builders & Innovators</span>
            </h1>
            <p className="about-hero-lead">
              Learnova was founded on a simple conviction: technology moves faster than traditional education. We bridge the gap with project-first curriculums taught by industry leaders.
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="about-stats-strip">
        <div className="container">
          <div className="about-stats-grid">
            {platformStats.map((st, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="about-stat-val">{st.value}</div>
                <div className="about-stat-lbl">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story-section">
        <div className="container">
          <div className="story-layout-grid">
            <div className="story-text-column">
              <span className="section-eyebrow">OUR MISSION</span>
              <h2 className="section-title">Reimagining Technical Education for the Modern Era</h2>
              <p className="story-paragraph">
                For years, aspiring engineers faced two unsatisfactory options: expensive multi-month bootcamps with outdated curriculums, or static video playlists with zero accountability and obsolete exercises.
              </p>
              <p className="story-paragraph">
                Learnova changed that. We combined interactive, cloud-hosted browser coding environments, active mentorship from practicing industry leads, and rigorous real-world capstone projects.
              </p>
              <p className="story-paragraph">
                Today, over 150,000 students across 85 countries trust Learnova to master artificial intelligence, distributed software architecture, cloud platforms, and modern data science.
              </p>
              <div className="story-checks">
                <div className="story-check-item">
                  <CheckCircleIcon size={18} className="check-icon" />
                  <span>100% project-based portfolio evaluations</span>
                </div>
                <div className="story-check-item">
                  <CheckCircleIcon size={18} className="check-icon" />
                  <span>Interactive coding sandboxes built into every lesson</span>
                </div>
                <div className="story-check-item">
                  <CheckCircleIcon size={18} className="check-icon" />
                  <span>Direct alumni network in leading tech organizations</span>
                </div>
              </div>
            </div>

            <div className="story-visual-column">
              <div className="story-card-highlight">
                <div className="highlight-quote-mark">“</div>
                <p className="highlight-quote-text">
                  Our learners don't just watch code being written—they architect, break, debug, and deploy real production systems.
                </p>
                <div className="highlight-author">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Dr. Elena Vance"
                    className="highlight-author-avatar"
                  />
                  <div>
                    <strong>Dr. Elena Vance</strong>
                    <span>Chief Academic Officer, Learnova</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="about-values-section">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">WHAT GUIDES US</span>
            <h2 className="section-title">Our Core Principles</h2>
            <p className="section-desc">
              Every curriculum decision, mentor partnership, and platform feature is anchored in these values.
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon">{val.icon}</div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & ADVISORS */}
      <section className="about-team-section">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">CURRICULUM ARCHITECTS</span>
            <h2 className="section-title">Meet Our Academic & Industry Advisory</h2>
            <p className="section-desc">
              Guided by veterans who have built and scaled systems for hundreds of millions of users.
            </p>
          </div>

          <div className="team-grid">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className="team-card">
                <img src={member.avatar} alt={member.name} className="team-avatar" />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER ECOSYSTEM */}
      <section className="about-partners-section">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">COLLABORATION NETWORK</span>
            <h2 className="section-title">Industry Partners & Alignment</h2>
            <p className="section-desc">
              Our curriculums integrate industry-standard toolchains and certifications.
            </p>
          </div>

          <div className="partners-chips-grid">
            {partnerOrganizations.map((partner, idx) => (
              <div key={idx} className="partner-chip-card">
                <AwardIcon size={20} className="partner-icon" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT CTA */}
      <section className="section-cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-card-content">
              <span className="cta-badge">BECOME PART OF LEARNOVA</span>
              <h2 className="cta-heading">Ready to Level Up Your Career?</h2>
              <p className="cta-subheading">
                Explore our industry-recognized courses or reach out to explore team training.
              </p>
              <div className="cta-buttons-row">
                <Link to="/courses" className="btn-cta-primary">
                  Explore Courses
                </Link>
                <Link to="/contact" className="btn-cta-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
