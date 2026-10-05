import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { classStatus } from "../../utils/batchStorage";
import useLiveWebRTC from "../../utils/useLiveWebRTC";
import "../teacher/LiveRoom.css";

export default function LiveRoom({ role = "Super Admin" }) {
  const { id, classId } = useParams();
  const targetId = classId || id;
  const navigate = useNavigate();
  const state = useBatches();
  const liveClass = state.classes.find(item => item.id === targetId);
  const [now, setNow] = useState(0);
  const [message, setMessage] = useState("");
  const active = liveClass && classStatus(liveClass, state) === "Live";
  const webrtc = useLiveWebRTC({ classId: targetId, role: "monitor", active, message: setMessage });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!liveClass || !["Live", "Completed"].includes(classStatus(liveClass, state))) {
    return <section className="live-room"><h1>Class unavailable</h1><p>This live session is no longer available.</p><button onClick={() => navigate(-1)}>Back to Live Classes</button></section>;
  }
  const status = classStatus(liveClass, state);
  const elapsedEnd = liveClass.endedAt ? new Date(liveClass.endedAt).getTime() : now;
  const elapsed = Math.max(0, Math.floor((elapsedEnd - new Date(liveClass.startedAt || liveClass.actualStartTime || now).getTime()) / 1000));
  const timerLabel = `${String(Math.floor(elapsed / 3600)).padStart(2, "0")}:${String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  const participants = (liveClass.participants || []).filter(item => !item.leftAt);
  const materials = state.materials.filter(item => item.classId === liveClass.id && item.status !== "Removed");
  return <section className="live-room monitor-live-room">
    <header><div><span className="live-room-badge">{status === "Live" ? "LIVE" : "COMPLETED"}</span><h1>{liveClass.lectureTitle || liveClass.title}</h1><p>{liveClass.course} | {liveClass.batch} | {liveClass.teacher} | {timerLabel}</p></div><button className="live-room-end" onClick={() => navigate(-1)}>Back to Live Classes</button></header>
    {status === "Completed" && <p role="status">This live class has ended.</p>}
    <div className="live-room-grid"><main><div className="live-stage"><video ref={webrtc.remoteVideoRef} autoPlay playsInline aria-label="Teacher live video" /><strong>{status === "Live" ? webrtc.connectionState : "Session ended"}</strong><span>{role} monitor — read-only observer</span></div><section className="monitor-session-card"><h2>Session Details</h2><dl><div><dt>Course</dt><dd>{liveClass.course}</dd></div><div><dt>Teacher</dt><dd>{liveClass.teacher}</dd></div><div><dt>Batch</dt><dd>{liveClass.batch}</dd></div><div><dt>Start Time</dt><dd>{liveClass.time || new Date(liveClass.startedAt).toLocaleTimeString()}</dd></div></dl></section><section className="live-material-upload monitor-materials"><h2>Shared Lecture Materials</h2>{liveClass.activeSharedMaterial && <p role="status">Currently shared: {liveClass.activeSharedMaterial.name}</p>}{materials.length ? materials.map(material => <p className="live-material-item" key={material.id}>{material.fileName || material.name}</p>) : <p>No lecture material uploaded.</p>}</section></main><aside className="live-room-panel"><h2>Participants ({participants.length})</h2>{participants.length ? participants.map(item => <p key={item.id}>{item.name} — {item.role}</p>) : <p>No participants have joined.</p>}<h2>Chat</h2><div className="live-chat-placeholder">{liveClass.chat?.length ? liveClass.chat.map(item => <p key={item.id}><strong>{item.senderName}:</strong> {item.message}</p>) : "No messages yet."}</div><h2>Recording / Session</h2><p>{status === "Completed" ? "Recording and session metadata remain available." : "Recording will be available when the teacher ends the class."}</p></aside></div>{message && <p role="status">{message}</p>}</section>;
}
