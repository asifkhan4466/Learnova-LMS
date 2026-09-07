import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AwardIcon,
  DownloadIcon,
  ExternalLinkIcon,
  SparklesIcon,
  CheckCircleIcon,
  XIcon,
  Share2Icon,
  BookOpenIcon
} from "../../components/Icons";
import { studentCertificates, enrolledCourses, studentProfile } from "../../data/studentData";

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const inProgressCourses = enrolledCourses.filter((c) => c.status === "in-progress");

  const handleCopyLink = (cert) => {
    navigator.clipboard?.writeText(cert.verificationUrl || `https://learnova.edu/verify/${cert.certificateId}`);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="student-certificates-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Certificates & Credentials</h1>
          <p className="student-page-subtitle">
            Showcase your verified achievements, share on LinkedIn, and download official Learnova credentials.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val">{studentCertificates.length}</span>
          <span className="badge-stat-lbl">Verified Credential</span>
        </div>
      </div>

      {/* Earned Certificates Grid */}
      <div className="section-title-wrap">
        <h2>Issued Certificates</h2>
        <span className="section-pill">Accredited & Verified</span>
      </div>

      <div className="certificates-grid">
        {studentCertificates.map((cert) => (
          <div key={cert.id} className="certificate-card lms-content-card">
            <div className="certificate-badge-top">
              <div className="cert-gold-ribbon">
                <AwardIcon size={24} />
              </div>
              <div className="cert-cred-id">ID: {cert.certificateId}</div>
            </div>

            <span className="cert-cat-tag">{cert.category}</span>
            <h3 className="cert-title">{cert.courseTitle}</h3>

            <div className="cert-meta-details">
              <div className="cert-meta-row">
                <span className="meta-label">Recipient:</span>
                <span className="meta-val">{cert.recipientName}</span>
              </div>
              <div className="cert-meta-row">
                <span className="meta-label">Issued:</span>
                <span className="meta-val">{cert.issueDate}</span>
              </div>
              <div className="cert-meta-row">
                <span className="meta-label">Final Grade:</span>
                <span className="meta-val highlight">{cert.grade}</span>
              </div>
              <div className="cert-meta-row">
                <span className="meta-label">Instructor:</span>
                <span className="meta-val">{cert.instructorName}</span>
              </div>
            </div>

            {/* Skills Pills */}
            <div className="cert-skills-wrap">
              <span className="skills-heading">Skills Validated:</span>
              <div className="cert-skills-pills">
                {cert.skillsCovered.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="cert-actions-footer">
              <button
                type="button"
                className="btn btn-primary btn-preview-cert"
                onClick={() => setSelectedCert(cert)}
              >
                <AwardIcon size={16} />
                <span>View Full Certificate</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary btn-icon-copy"
                onClick={() => handleCopyLink(cert)}
                title="Copy verification link"
              >
                <Share2Icon size={16} />
                <span>{copiedId ? "Copied!" : "Share"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Certificates in Progress */}
      <div className="upcoming-certs-section">
        <div className="section-title-wrap">
          <h2>Upcoming Credentials in Progress</h2>
          <span className="section-pill">Unlocks upon 100% completion</span>
        </div>

        <div className="upcoming-certs-grid">
          {inProgressCourses.map((c) => (
            <div key={c.id} className="upcoming-cert-tile lms-content-card">
              <div className="upcoming-header">
                <div className="upcoming-icon-wrap">
                  <BookOpenIcon size={20} />
                </div>
                <div>
                  <h4 className="upcoming-title">{c.title}</h4>
                  <span className="upcoming-instructor">Instructor: {c.instructor}</span>
                </div>
              </div>

              <div className="upcoming-progress-section">
                <div className="progress-info-flex">
                  <span>{c.progress}% Completed</span>
                  <span>{c.totalLessons - c.completedLessons} Lessons Remaining</span>
                </div>
                <div className="lms-progress-track">
                  <div
                    className="lms-progress-fill"
                    style={{ width: `${c.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="upcoming-footer">
                <Link to={`/student/course/${c.id}`} className="btn btn-secondary btn-sm">
                  Continue Course →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OFFICIAL CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="modal-overlay">
          <div className="cert-modal-dialog">
            <div className="cert-modal-header">
              <h3>Official Certificate Preview</h3>
              <div className="cert-header-actions">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleDownload}
                >
                  <DownloadIcon size={15} />
                  <span>{downloadSuccess ? "Downloaded!" : "Download PDF"}</span>
                </button>
                <button
                  type="button"
                  className="btn-modal-close"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close modal"
                >
                  <XIcon size={20} />
                </button>
              </div>
            </div>

            {/* Physical-style Certificate Sheet */}
            <div className="certificate-sheet-container" id="printable-certificate">
              <div className="cert-sheet-border">
                <div className="cert-inner-frame">
                  {/* Watermark / Logo */}
                  <div className="cert-sheet-header">
                    <div className="cert-branding">
                      <img src="/images/Logo.png" alt="Learnova" className="cert-logo-img" />
                      <span className="cert-brand-name">Learnova</span>
                    </div>
                    <span className="cert-type-tag">CERTIFICATE OF COMPLETION & MASTERY</span>
                  </div>

                  {/* Body Text */}
                  <div className="cert-sheet-body">
                    <p className="cert-presentation-text">This official certificate is proudly awarded to</p>
                    <h1 className="cert-recipient-name">{selectedCert.recipientName}</h1>
                    <p className="cert-achievement-desc">
                      for successfully demonstrating rigorous conceptual understanding, practical lab implementations, and capstone excellence in
                    </p>
                    <h2 className="cert-awarded-course">{selectedCert.courseTitle}</h2>
                    <p className="cert-conferred-note">
                      Conferred on <strong>{selectedCert.issueDate}</strong> with an evaluation grade of{" "}
                      <strong>{selectedCert.grade}</strong>.
                    </p>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="cert-sheet-footer">
                    <div className="cert-sign-col">
                      <div className="cert-signature-line">
                        <span className="script-sig">Maya Lin</span>
                      </div>
                      <span className="sign-name">{selectedCert.instructorName}</span>
                      <span className="sign-title">{selectedCert.instructorTitle}</span>
                    </div>

                    {/* Gold Stamp Emblem */}
                    <div className="cert-emblem-seal">
                      <div className="seal-star">★</div>
                      <span className="seal-text">VERIFIED</span>
                      <span className="seal-org">LEARNOVA</span>
                    </div>

                    <div className="cert-sign-col">
                      <div className="cert-signature-line">
                        <span className="script-sig">Julian Thorne, Ph.D.</span>
                      </div>
                      <span className="sign-name">Dr. Julian Thorne</span>
                      <span className="sign-title">VP of Academic Standards, Learnova</span>
                    </div>
                  </div>

                  {/* Bottom Verification Details */}
                  <div className="cert-sheet-meta-bottom">
                    <span>Credential ID: <strong>{selectedCert.certificateId}</strong></span>
                    <span>Verify Authenticity: <strong>{selectedCert.verificationUrl}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
