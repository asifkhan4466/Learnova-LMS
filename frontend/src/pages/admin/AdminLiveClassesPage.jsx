import React, { useState } from "react";
import {
  VideoIcon,
  SearchIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from "../../components/Icons";
import { adminLiveClasses } from "../../data/adminData";

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState(adminLiveClasses);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStream, setSelectedStream] = useState(null);
  const [streamTerminated, setStreamTerminated] = useState(false);

  const filtered = classes.filter((c) => {
    if (activeTab === "live") return c.status === "Live Now";
    if (activeTab === "upcoming") return c.status === "Upcoming";
    if (activeTab === "completed") return c.status === "Completed";
    return true;
  });

  const handleTerminateStream = (streamId) => {
    if (confirm("Execute administrative shutdown on this live stream broadcast?")) {
      setClasses((prev) =>
        prev.map((c) => (c.id === streamId ? { ...c, status: "Terminated by Admin" } : c))
      );
      setStreamTerminated(true);
      setTimeout(() => {
        setStreamTerminated(false);
        setSelectedStream(null);
      }, 1200);
    }
  };

  return (
    <div className="admin-live-classes-page">
      {/* Header */}
      <div className="student-page-header">
        <div>
          <h1>Live Broadcast Streams & WebRTC Telemetry</h1>
          <p className="student-page-subtitle">
            Real-time platform oversight of active instructor livestreams, bitrate health metrics, and room capacity.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val text-emerald">14</span>
          <span className="badge-stat-lbl">Active Streams</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="learning-filter-bar">
        <div className="learning-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Broadcasts ({classes.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "live" ? "active" : ""}`}
            onClick={() => setActiveTab("live")}
          >
            Live Now (2)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="lms-content-card studio-table-container">
        <table className="studio-data-table">
          <thead>
            <tr>
              <th>Broadcast Session</th>
              <th>Curriculum</th>
              <th>Host Faculty</th>
              <th>Learners in Room</th>
              <th>Bitrate & Health</th>
              <th>Status</th>
              <th>Administrative Control</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div>
                    <strong>{item.title}</strong>
                    <span className="table-sub-detail">Started: {item.startedAt}</span>
                  </div>
                </td>
                <td><span className="course-ref-text">{item.course}</span></td>
                <td><strong>{item.teacher}</strong></td>
                <td>
                  <div className="table-metric-item">
                    <UsersIcon size={14} />
                    <span>{item.attendees}</span>
                  </div>
                </td>
                <td>
                  <span className="telemetry-pill">{item.bitrate}</span>
                </td>
                <td>
                  <span
                    className={`status-tag ${
                      item.status === "Live Now"
                        ? "published"
                        : item.status === "Upcoming"
                        ? "in-review"
                        : "draft"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => setSelectedStream(item)}
                  >
                    Inspect Stream
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STREAM INSPECT MODAL */}
      {selectedStream && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">WebRTC Cluster Telemetry</span>
                <h2>Inspect Broadcast: {selectedStream.title}</h2>
              </div>
              <button type="button" className="btn-modal-close" onClick={() => setSelectedStream(null)}>✕</button>
            </div>

            {streamTerminated ? (
              <div style={{ textAlign: "center", padding: "36px" }}>
                <CheckCircleIcon size={48} className="text-danger" style={{ margin: "0 auto 12px" }} />
                <h3>Stream Terminated by Administrator</h3>
                <p className="text-muted">WebRTC connection closed for all 342 participants.</p>
              </div>
            ) : (
              <div className="quiz-modal-body">
                <div className="recipient-info-box">
                  <div>
                    <strong>{selectedStream.title}</strong>
                    <p className="text-muted" style={{ margin: "4px 0", fontSize: "13px" }}>
                      Host: <strong>{selectedStream.teacher}</strong> • Curriculum: {selectedStream.course}
                    </p>
                    <p className="text-muted" style={{ margin: 0, fontSize: "12px" }}>
                      Current Attendees: <strong>{selectedStream.attendees}</strong> • Stream Status: <strong>{selectedStream.status}</strong>
                    </p>
                  </div>
                </div>

                <div className="vetting-details-grid" style={{ marginTop: "16px" }}>
                  <div className="vetting-item">
                    <span>Transcoding Node:</span>
                    <strong>us-west-sfu-04.learnova.net</strong>
                  </div>
                  <div className="vetting-item">
                    <span>Packet Loss:</span>
                    <strong className="text-success">&lt;0.02% (Optimal)</strong>
                  </div>
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "24px" }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedStream(null)}>Close</button>
                  {selectedStream.status === "Live Now" && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleTerminateStream(selectedStream.id)}
                    >
                      Emergency Terminate Stream
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
