import React, { useState } from "react";
import {
  AwardIcon,
  SearchIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  ExternalLinkIcon
} from "../../components/Icons";
import { adminCertificates } from "../../data/adminData";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState(adminCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(false);

  const filtered = certs.filter((c) =>
    c.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleRevoke = (certId) => {
    setCerts((prev) =>
      prev.map((c) => {
        if (c.id === certId) {
          const newStatus = c.status === "Active & Verified" ? "Revoked / Nullified" : "Active & Verified";
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
    setActionSuccess(true);
    setTimeout(() => {
      setActionSuccess(false);
      setSelectedCert(null);
    }, 1200);
  };

  return (
    <div className="admin-certificates-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Cryptographic Certificate Authority & Governance</h1>
          <p className="student-page-subtitle">
            Registry of issued credentials, blockchain hash verification, credential audits, and administrative nullifications.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">42,180</span>
          <span className="badge-stat-lbl">Verified Credentials Issued</span>
        </div>
      </div>

      {/* Search */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "360px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by Credential ID, student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Credential ID</th>
              <th>Graduate Scholar</th>
              <th>Accredited Curriculum</th>
              <th>Certifying Faculty</th>
              <th>Conferred Date</th>
              <th>Status</th>
              <th>Audit Authority</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><code>{item.certificateId}</code></td>
                <td><strong>{item.studentName}</strong></td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td>{item.instructor}</td>
                <td>{item.issueDate}</td>
                <td>
                  <span className={`status-tag ${item.status.includes("Active") ? "published" : "draft"}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => setSelectedCert(item)}
                  >
                    Manage Credential
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CERT MODAL */}
      {selectedCert && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Credential Registry</span>
                <h2>Audit Credential: {selectedCert.certificateId}</h2>
              </div>
              <button type="button" className="btn-modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            </div>

            {actionSuccess ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-success" style={{ margin: "0 auto 12px" }} />
                <h3>Credential Status Updated!</h3>
                <p className="text-muted">Verification URL metadata updated in real-time.</p>
              </div>
            ) : (
              <div className="quiz-modal-body">
                <div className="recipient-info-box">
                  <div>
                    <strong>{selectedCert.studentName}</strong>
                    <p className="text-muted" style={{ margin: "4px 0", fontSize: "13px" }}>
                      Curriculum: <strong>{selectedCert.course}</strong>
                    </p>
                    <p className="text-muted" style={{ margin: 0, fontSize: "12px" }}>
                      Verification URL: <code>{selectedCert.verificationUrl}</code>
                    </p>
                  </div>
                </div>

                <div className="vetting-details-grid" style={{ marginTop: "16px" }}>
                  <div className="vetting-item">
                    <span>Cryptographic Signature:</span>
                    <strong className="text-success">Valid (ECDSA P-256)</strong>
                  </div>
                  <div className="vetting-item">
                    <span>Current Status:</span>
                    <strong>{selectedCert.status}</strong>
                  </div>
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedCert(null)}>Close</button>
                  <button
                    type="button"
                    className={`btn ${selectedCert.status.includes("Active") ? "btn-danger" : "btn-primary"}`}
                    onClick={() => handleToggleRevoke(selectedCert.id)}
                  >
                    {selectedCert.status.includes("Active") ? "Revoke / Invalidate Credential" : "Re-Verify Credential"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
