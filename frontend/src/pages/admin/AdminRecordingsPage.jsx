import React, { useState } from "react";
import {
  PlayCircleIcon,
  SearchIcon,
  DownloadIcon,
  ClockIcon,
  EyeIcon,
  CheckCircleIcon
} from "../../components/Icons";
import { adminRecordings } from "../../data/adminData";

export default function AdminRecordingsPage() {
  const [recordings, setRecordings] = useState(adminRecordings);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRec, setSelectedRec] = useState(null);

  const filtered = recordings.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-recordings-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Platform Lecture Recordings & CDN Storage</h1>
          <p className="student-page-subtitle">
            Manage global lecture archives, video storage quotas on Cloudflare R2, and streaming bandwidth distribution.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">1.4 TB</span>
          <span className="badge-stat-lbl">Global CDN Media Cache</span>
        </div>
      </div>

      {/* Filter */}
      <div className="learning-filter-bar">
        <div className="search-input-box" style={{ maxWidth: "340px" }}>
          <SearchIcon size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search recordings by title, teacher..."
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
              <th>Lecture Recording</th>
              <th>Curriculum</th>
              <th>Faculty Host</th>
              <th>Duration</th>
              <th>Storage Size</th>
              <th>Playback Views</th>
              <th>CDN Storage Edge</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div>
                    <strong>{item.title}</strong>
                    <span className="table-sub-detail">Recorded: {item.date}</span>
                  </div>
                </td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td>{item.teacher}</td>
                <td>{item.duration}</td>
                <td><code>{item.fileSize}</code></td>
                <td><strong>{item.views.toLocaleString()}</strong></td>
                <td><span className="telemetry-pill">{item.cdnEdge}</span></td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => alert(`Purging and re-indexing CDN cache for: ${item.title}`)}
                  >
                    Purge CDN Cache
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
