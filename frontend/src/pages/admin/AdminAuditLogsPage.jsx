import React, { useState } from "react";
import {
  ActivityIcon,
  SearchIcon,
  DownloadIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from "../../components/Icons";
import { adminAuditLogs } from "../../data/adminData";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState(adminAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = logs.filter((l) =>
    l.adminUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-audit-logs-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Security & Administrative Audit Logs</h1>
          <p className="student-page-subtitle">
            Cryptographic ledger tracking all administrator operations, account state mutations, and access anomalies.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-secondary" onClick={() => alert("Audit trail exported.")}>
            <DownloadIcon size={16} />
            <span>Export Log Archive</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "360px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by admin user, action, target..."
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
              <th>Log ID</th>
              <th>Administrator / Sentinel</th>
              <th>Action Executed</th>
              <th>Target Resource</th>
              <th>Timestamp</th>
              <th>IP Address</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td><code>{item.id}</code></td>
                <td><strong>{item.adminUser}</strong></td>
                <td><span className="audit-action-chip">{item.action}</span></td>
                <td><strong>{item.target}</strong></td>
                <td>{item.timestamp}</td>
                <td><code>{item.ipAddress}</code></td>
                <td>
                  <span className={`status-tag ${item.status === "Success" ? "published" : "in-review"}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
