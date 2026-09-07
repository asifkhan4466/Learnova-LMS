import React, { useState } from "react";
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon
} from "../components/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "student",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState({ 0: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const faqs = [
    {
      q: "How do Learnova course certificates work?",
      a: "Upon completing all video modules, coding assignments, and capstone labs, you receive a verifiable digital certificate with a permanent URL and credential ID that you can share on LinkedIn, GitHub, or directly with employers."
    },
    {
      q: "Are the courses self-paced or do they follow a schedule?",
      a: "All courses offer flexible self-paced learning with lifetime access. In addition, you can attend optional weekly live mentor office hours and participate in cohort study groups."
    },
    {
      q: "What is the 30-Day Money-Back Guarantee policy?",
      a: "If you enroll in any course and decide it's not the right fit for your learning goals within 30 days of purchase, you can request a 100% full refund with no questions asked."
    },
    {
      q: "Does Learnova provide corporate and enterprise training?",
      a: "Yes. We offer Learnova for Teams with centralized analytics, custom learning paths in AI and Cloud, and dedicated enterprise account managers. Select 'Enterprise Training' in the contact form above."
    },
    {
      q: "Can I apply to become an instructor or curriculum creator?",
      a: "Absolutely. We are constantly looking for senior practitioners and researchers. Choose 'Instructor Application' in our contact form and share your background."
    }
  ];

  return (
    <div className="contact-page">
      {/* CONTACT HERO */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-badge">SUPPORT & ADVISORY</span>
            <h1 className="contact-hero-title">We're Here to Help You Succeed</h1>
            <p className="contact-hero-subtitle">
              Have questions about courses, enterprise team plans, or instructor partnerships? Reach out to our team.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS STRIP */}
      <section className="contact-channels-section">
        <div className="container">
          <div className="contact-cards-grid">
            <div className="contact-info-card">
              <div className="contact-card-icon">
                <MailIcon size={24} />
              </div>
              <h3>Student Support</h3>
              <p>For questions about courses, labs, billing, or certificates.</p>
              <a href="mailto:support@learnova.edu" className="contact-card-link">
                support@learnova.edu
              </a>
              <span className="response-time">Average response: &lt; 2 hours</span>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <SparklesIcon size={24} />
              </div>
              <h3>Enterprise & Teams</h3>
              <p>Upskill your engineering, cloud, and data science organizations.</p>
              <a href="mailto:enterprise@learnova.edu" className="contact-card-link">
                enterprise@learnova.edu
              </a>
              <span className="response-time">Dedicated account manager</span>
            </div>

            <div className="contact-info-card">
              <div className="contact-card-icon">
                <PhoneIcon size={24} />
              </div>
              <h3>Phone & Advisory</h3>
              <p>Speak directly with an education counselor regarding your roadmap.</p>
              <span className="contact-phone-number">+1 (800) 555-LEARN</span>
              <span className="response-time">Mon - Fri: 9am - 6pm EST</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & OFFICE INFO */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-layout">
            {/* Form Column */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="form-success-message">
                  <div className="success-icon-wrap">
                    <CheckCircleIcon size={48} className="success-icon" />
                  </div>
                  <h3>Thank You, {formData.name}!</h3>
                  <p>
                    Your message regarding "<strong>{formData.subject || "General Inquiry"}</strong>" has been received. Our support team will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-primary-join"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        inquiryType: "student",
                        subject: "",
                        message: ""
                      });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header-area">
                    <h2 className="form-title">Send Us a Message</h2>
                    <p className="form-subtitle">
                      Fill out the form below and a representative will be in touch shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="actual-contact-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="inquiryType">Inquiry Type</label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                        >
                          <option value="student">Student Course Support</option>
                          <option value="enterprise">Enterprise / Team Upskilling</option>
                          <option value="instructor">Instructor Application</option>
                          <option value="press">Press & Media</option>
                          <option value="other">General Feedback</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">Subject *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide details about your inquiry or question..."
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-contact-submit">
                      Send Inquiry
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="contact-sidebar-info">
              <div className="sidebar-info-box">
                <h3 className="sidebar-box-title">Global Headquarters</h3>
                <div className="office-item">
                  <MapPinIcon size={20} className="office-icon" />
                  <div>
                    <strong>Learnova Inc.</strong>
                    <p>100 Innovation Way, Suite 400</p>
                    <p>San Francisco, CA 94107, USA</p>
                  </div>
                </div>

                <div className="office-item">
                  <MapPinIcon size={20} className="office-icon" />
                  <div>
                    <strong>European Regional Hub</strong>
                    <p>75 Tech Quarter, Finsbury</p>
                    <p>London EC2A 1AE, United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="sidebar-info-box callout-box">
                <h4>Looking for Fast Answers?</h4>
                <p>
                  Browse our comprehensive FAQ below or visit our knowledge base for instant answers regarding billing, course certificates, and sandboxes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="section-header center-text">
            <span className="section-eyebrow">COMMON QUESTIONS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Quick answers to the most common questions about the Learnova platform.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = !!openFaq[idx];
              return (
                <div key={idx} className={`faq-card ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-chevron">
                      {isOpen ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
