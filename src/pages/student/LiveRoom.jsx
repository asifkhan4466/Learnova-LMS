import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { canJoinClass, requestScreenShare, studentId, joinLiveSession, leaveLiveSession, updateLiveParticipant, sendLiveChat } from "../../utils/batchStorage";
import useLiveWebRTC from "../../utils/useLiveWebRTC";
import "../teacher/LiveRoom.css";

export default function LiveRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useBatches();
  const liveClass = state.classes.find(item => item.id === id);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [now, setNow] = useState(0);
  const webrtc = useLiveWebRTC({ classId: id, role: "student", active: liveClass?.status === "Live" && canJoinClass(studentId, liveClass, state), message: setMessage });
  useEffect(() => {
    const timer = window.setInterval(() => setNow(value => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const participant = liveClass?.participants?.find(item => item.id === studentId);
  useEffect(() => {
    if (liveClass?.status === "Live" && !participant) {
      try { joinLiveSession(id, studentId, "Ahmed Khan", "Student"); } catch (error) { window.setTimeout(() => setMessage(error.message), 0); }
    }
  }, [id, liveClass?.status, participant]);
  if (!liveClass || !["Live", "Completed"].includes(liveClass.status) || (liveClass.status === "Live" && !canJoinClass(studentId, liveClass, state))) return <section className="live-room"><h1>Class unavailable</h1><p>Waiting for the teacher to start this class, or your enrollment is not eligible for its active batch.</p><button onClick={() => navigate("/student/live-classes")}>Back to Live Classes</button></section>;
  const participants = (liveClass.participants || []).filter(item => !item.leftAt);
  const chat = liveClass.chat || [];
  const elapsed = liveClass.status === "Completed" && liveClass.endedAt && liveClass.startedAt ? Math.max(0, Math.floor((new Date(liveClass.endedAt) - new Date(liveClass.startedAt)) / 1000)) : now;
  const timerLabel = `${String(Math.floor(elapsed / 3600)).padStart(2, "0")}:${String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  const approved = liveClass.screenShareApproved?.includes(studentId);

  function request() {
    try { requestScreenShare(id, studentId); setMessage("Screen share request sent to your teacher."); }
    catch (error) { setMessage(error.message); }
  }
  function update(updates) { try { updateLiveParticipant(id, studentId, updates); } catch (error) { setMessage(error.message); } }
  function leave() { try { leaveLiveSession(id, studentId); navigate("/student/live-classes"); } catch (error) { setMessage(error.message); } }
  function sendChat(event) { event.preventDefault(); try { sendLiveChat(id, studentId, "Ahmed Khan", "Student", chatMessage); setChatMessage(""); } catch (error) { setMessage(error.message); } }
  const materials = state.materials.filter(item => item.classId === liveClass.id && item.status === "Available");
  return <section className="live-room">
    <header><div><span className="live-room-badge">{liveClass.status === "Live" ? "LIVE" : "COMPLETED"}</span><h1>{liveClass.title}</h1><p>{liveClass.course} | {liveClass.batch} | {liveClass.teacher} | {timerLabel}</p></div><button className="live-room-end" onClick={liveClass.status === "Live" ? leave : () => navigate("/student/live-classes")}>{liveClass.status === "Live" ? "Leave Class" : "Back to Live Classes"}</button></header>
    {liveClass.status === "Completed" && <p role="status">This live class has ended.</p>}
    <div className="live-room-grid"><main><div className="live-stage"><video ref={webrtc.remoteVideoRef} autoPlay playsInline aria-label="Teacher live video" /><strong>{webrtc.connectionState}</strong><span>Teacher camera and microphone stream</span>{approved && <small>Your screen share is approved</small>}{participants.map(item => <div className="live-participant-tile" key={item.id}>{item.name} — {item.role} ({item.camera ? "Camera on" : "Camera off"})</div>)}</div><div className="live-room-controls"><button disabled={liveClass.status !== "Live"} onClick={() => { setMic(!mic); update({ mic: !mic }); }}>{mic ? "Mute" : "Unmute"} Microphone</button><button disabled={liveClass.status !== "Live"} onClick={() => { setCamera(!camera); update({ camera: !camera }); }}>{camera ? "Turn Camera Off" : "Turn Camera On"}</button><button onClick={approved ? webrtc.toggleScreen : request} disabled={liveClass.status !== "Live"}>{approved ? (webrtc.mediaState.screen ? "Stop Screen Share" : "Share Screen") : "Request Screen Share"}</button><button type="button" onClick={() => setMessage(`${participants.length} participant${participants.length === 1 ? "" : "s"} in this session.`)}>Participants</button></div><p className="live-room-note">You can request screen sharing, but only your teacher can approve it.</p>    <section className="live-material-upload"><h2>Shared Lecture Materials</h2>{liveClass.activeSharedMaterial && <p role="status">Shared Material: {liveClass.activeSharedMaterial.name} <a href={materials.find(item => item.id === liveClass.activeSharedMaterial.materialId)?.fileData || "#"} target="_blank" rel="noreferrer">Open / View</a></p>}{materials.length ? materials.map(material => <p className="live-material-item" key={material.id}>{material.fileName}</p>) : <p>No lecture material uploaded yet. You can continue the class.</p>}</section></main><aside className="live-room-panel"><h2>Participants ({participants.length})</h2>{participants.map(item => <p key={item.id}>{item.name} — {item.role}</p>)}<h2>Chat</h2><div className="live-chat-placeholder">{chat.map(item => <p key={item.id}><strong>{item.senderName}:</strong> {item.message}</p>)}</div>{liveClass.status === "Live" && <form onSubmit={sendChat}><input value={chatMessage} onChange={event => setChatMessage(event.target.value)} placeholder="Write a message..." /><button type="submit">Send</button></form>}<h2>Shared Materials</h2><div className="live-chat-placeholder">New materials from your teacher appear automatically.</div></aside></div>{message && <p role="status">{message}</p>}</section>;
}
