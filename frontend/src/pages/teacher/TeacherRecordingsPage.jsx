import React, { useState } from "react";
import {
  PlayCircleIcon,
  ClockIcon,
  CalendarIcon,
  DownloadIcon,
  EyeIcon,
  EditIcon,
  CheckCircleIcon,
  Share2Icon,
  XIcon
} from "../../components/Icons";
import { teacherRecordings } from "../../data/teacherData";

export default function TeacherRecordingsPage() {
  const [recordings, setRecordings] = useState(teacherRecordings);
  const [activeModalRecording, setActiveModalRecording] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editChapter, setEditChapter] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpenWatchEdit = (rec) => {
    setActiveModalRecording(rec);
    setEditTitle(rec.title);
    setEditChapter(rec.chapter);
    setSaveSuccess(false);
    setCopiedLink(false);
  };

  const handleSaveMetadata = (e) => {
    e.preventDefault();
    setRecordings((prev) =>
      prev.map((r) => {
        if (r.id === activeModalRecording.id) {
          return {
            ...r,
            title: editTitle,
            chapter: editChapter
          };
        }
        return r;
      })
    );

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCopyShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="teacher-recordings-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Lecture Recordings & Stream Archives</h1>
          <p className="student-page-subtitle">
            Curate past live broadcasts, update chapter bookmarks, monitor student playback analytics, and manage archive access.
          </p>
        </div>
        <div className="header-badge-stat">
          <span className="badge-stat-val">{recordings.length}</span>
          <span className="badge-stat-lbl">Archived Recordings</span>
        </div>
      </div>

      {/* Recordings Grid */}
      <div className="recordings-grid">
        {recordings.map((rec) => (
          <div key={rec.id} className="recording-card lms-content-card">
            <div className="recording-thumb-box" onClick={() => handleOpenWatchEdit(rec)}>
              <div className="rec-play-overlay">
                <PlayCircleIcon size={44} />
              </div>
              <span className="rec-duration-tag">{rec.duration}</span>
            </div>

            <div className="rec-card-body">
              <span className="rec-course-tag">{rec.course}</span>
              <h3 className="rec-title" onClick={() => handleOpenWatchEdit(rec)}>{rec.title}</h3>
              <p className="rec-chapter-text">{rec.chapter}</p>

              <div className="rec-meta-row">
                <span><CalendarIcon size={14} /> {rec.date}</span>
                <span><EyeIcon size={14} /> {rec.views.toLocaleString()} Views</span>
                <span>File Size: {rec.fileSize}</span>
              </div>

              <div className="rec-card-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => handleOpenWatchEdit(rec)}
                >
                  <EyeIcon size={14} />
                  <span>Watch & Edit</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => alert(`Initiating download for ${rec.fileSize} file: ${rec.title}`)}
                  title="Download MP4 file"
                >
                  <DownloadIcon size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WATCH & EDIT RECORDING MODAL */}
      {activeModalRecording && (
        <div className="modal-overlay">
          <div className="cert-modal-dialog" style={{ maxWidth: "860px" }}>
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">{activeModalRecording.course}</span>
                <h2>{activeModalRecording.title}</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveModalRecording(null)}
              >
                ✕
              </button>
            </div>

            <div className="quiz-modal-body">
              {/* Simulated Video Player */}
              <div className="player-video-viewport" style={{ marginBottom: "20px" }}>
                <video
                  controls
                  className="modal-video-element"
                  src={activeModalRecording.videoUrl}
                  poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {saveSuccess && (
                <div className="alert-banner success" style={{ marginBottom: "16px" }}>
                  <CheckCircleIcon size={18} />
                  <span>Lecture metadata and chapter notes saved successfully!</span>
                </div>
              )}

              {/* Edit Metadata Form */}
              <form onSubmit={handleSaveMetadata} className="recording-metadata-form">
                <div className="form-group full-width">
                  <label>Lecture Title *</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                  <div className="form-group">
                    <label>Module / Chapter Bookmark</label>
                    <input
                      type="text"
                      value={editChapter}
                      onChange={(e) => setEditChapter(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Recorded Date & Duration</label>
                    <input
                      type="text"
                      value={`${activeModalRecording.date} • ${activeModalRecording.duration}`}
                      disabled
                      className="bg-disabled"
                    />
                  </div>
                </div>

                <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCopyShare}
                  >
                    <Share2Icon size={14} />
                    <span>{copiedLink ? "Link Copied!" : "Copy Share Link"}</span>
                  </button>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setActiveModalRecording(null)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Recording Details
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
