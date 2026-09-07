import React, { useState } from "react";
import {
  VideoIcon,
  PlusIcon,
  ClockIcon,
  UsersIcon,
  CheckCircleIcon,
  CalendarIcon,
  XIcon
} from "../../components/Icons";
import { teacherLiveClasses, teacherCourses } from "../../data/teacherData";

export default function TeacherLiveClassesPage() {
  const [classes, setClasses] = useState(teacherLiveClasses);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [liveStreamActive, setLiveStreamActive] = useState(null); // class object or null
  const [liveChatMessages, setLiveChatMessages] = useState([
    { user: "Alex Morgan", text: "Dr. Vance, will you cover recursion limits in LangGraph today?" },
    { user: "Sophia Martinez", text: "The audio and screenshare look crystal clear!" },
    { user: "David Kim", text: "Can we review state checkpointing before the demo?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const [newClass, setNewClass] = useState({
    title: "",
    course: "Next-Gen AI Agents & LLM Application Engineering",
    dateTime: "Friday at 3:00 PM PST",
    duration: "60 mins",
    agenda: ""
  });

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newClass.title) return;

    const scheduled = {
      id: `live-${Date.now()}`,
      title: newClass.title,
      course: newClass.course,
      dateTime: newClass.dateTime,
      duration: newClass.duration,
      enrolledAttendees: 150,
      status: "upcoming",
      agenda: newClass.agenda
    };

    setClasses([scheduled, ...classes]);
    setScheduleModalOpen(false);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setLiveChatMessages([...liveChatMessages, { user: "Dr. Elena Vance (Instructor)", text: chatInput.trim() }]);
      setChatInput("");
    }
  };

  return (
    <div className="teacher-live-classes-page">
      {/* Page Header */}
      <div className="student-page-header">
        <div>
          <h1>Live Classroom & Interactive Broadcasts</h1>
          <p className="student-page-subtitle">
            Host real-time technical workshops, answer live coding questions, and schedule upcoming office hours.
          </p>
        </div>
        <div className="header-actions-group">
          <button type="button" className="btn btn-primary" onClick={() => setScheduleModalOpen(true)}>
            <PlusIcon size={16} />
            <span>Schedule Live Session</span>
          </button>
        </div>
      </div>

      {/* Live Classes Grid */}
      <div className="live-classes-grid">
        {classes.map((item) => (
          <div key={item.id} className="live-session-card lms-content-card">
            <div className="live-card-badge-top">
              <span className={`live-status-pill ${item.status}`}>
                {item.status === "upcoming" ? "Scheduled Upcoming" : "Past Broadcast"}
              </span>
              <span className="live-duration-chip"><ClockIcon size={14} /> {item.duration}</span>
            </div>

            <span className="live-course-tag">{item.course}</span>
            <h3 className="live-session-title">{item.title}</h3>

            <div className="live-meta-block">
              <div className="live-meta-item">
                <CalendarIcon size={16} />
                <span>{item.dateTime}</span>
              </div>
              <div className="live-meta-item">
                <UsersIcon size={16} />
                <span>{item.enrolledAttendees} Registered Learners</span>
              </div>
            </div>

            {item.agenda && (
              <div className="live-agenda-preview">
                <strong>Session Agenda:</strong>
                <p>{item.agenda}</p>
              </div>
            )}

            <div className="live-card-actions">
              {item.status === "upcoming" ? (
                <button
                  type="button"
                  className="btn btn-primary full-width"
                  onClick={() => setLiveStreamActive(item)}
                >
                  <VideoIcon size={16} />
                  <span>Start Live Broadcast Now</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary full-width"
                  onClick={() => alert("Recording has been published to student archive.")}
                >
                  Inspect Archived Recording
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SCHEDULE MODAL */}
      {scheduleModalOpen && (
        <div className="modal-overlay">
          <div className="quiz-modal-card">
            <div className="quiz-modal-header">
              <div>
                <span className="quiz-modal-course">Live Studio Scheduling</span>
                <h2>Schedule New Interactive Class</h2>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setScheduleModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="quiz-modal-body">
              <div className="form-group full-width">
                <label>Session Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Masterclass: LangGraph Stateful Multi-Agent Deadlocks"
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: "14px" }}>
                <label>Associated Curriculum</label>
                <select
                  value={newClass.course}
                  onChange={(e) => setNewClass({ ...newClass, course: e.target.value })}
                >
                  {teacherCourses.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-fields-grid" style={{ marginTop: "14px" }}>
                <div className="form-group">
                  <label>Date & Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Sep 14 at 11:00 AM PST"
                    value={newClass.dateTime}
                    onChange={(e) => setNewClass({ ...newClass, dateTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={newClass.duration}
                    onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group full-width" style={{ marginTop: "14px" }}>
                <label>Topic & Session Agenda</label>
                <textarea
                  rows={3}
                  placeholder="Outline key concepts, code repositories, or lab demonstrations..."
                  value={newClass.agenda}
                  onChange={(e) => setNewClass({ ...newClass, agenda: e.target.value })}
                />
              </div>

              <div className="quiz-nav-actions" style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setScheduleModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Notify Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE BROADCAST STUDIO MODAL */}
      {liveStreamActive && (
        <div className="modal-overlay">
          <div className="live-broadcast-dialog">
            <div className="broadcast-header">
              <div className="live-indicator-tag">
                <span className="live-red-pulse"></span>
                <span>ON AIR • LIVE BROADCAST</span>
              </div>
              <h2 className="broadcast-title">{liveStreamActive.title}</h2>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => setLiveStreamActive(null)}
              >
                End Session
              </button>
            </div>

            <div className="broadcast-layout-grid">
              {/* Left: Main Stage Video */}
              <div className="broadcast-main-stage">
                <div className="instructor-feed-box">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Instructor Stream"
                    className="instructor-cam-img"
                  />
                  <div className="feed-overlay-badge">Dr. Elena Vance (Host)</div>
                  <div className="screenshare-badge">Screen Sharing: VS Code (langgraph_agent.py)</div>
                </div>

                <div className="broadcast-controls-strip">
                  <div className="ctrl-chip mic active">Mic: Active (Elgato Wave 3)</div>
                  <div className="ctrl-chip cam active">Cam: 1080p 60fps</div>
                  <div className="ctrl-chip viewers">Learners in Room: 342</div>
                </div>
              </div>

              {/* Right: Live Chat & Q&A Stream */}
              <div className="broadcast-chat-pane">
                <div className="chat-header">
                  <h4>Live Q&A Chat ({liveChatMessages.length})</h4>
                </div>

                <div className="chat-messages-container">
                  {liveChatMessages.map((msg, i) => (
                    <div key={i} className={`chat-message-item ${msg.user.includes("Instructor") ? "instructor" : ""}`}>
                      <span className="chat-sender">{msg.user}</span>
                      <p className="chat-text">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="chat-input-row">
                  <input
                    type="text"
                    placeholder="Broadcast an answer to learners..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-sm btn-primary">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
