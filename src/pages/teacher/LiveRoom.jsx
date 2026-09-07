import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { endClass, resolveScreenShare, teacherId, uploadLectureMaterial, shareLectureMaterial, stopSharingLectureMaterial, joinLiveSession, updateLiveParticipant, sendLiveChat } from "../../utils/batchStorage";
import useLiveWebRTC from "../../utils/useLiveWebRTC";
import "./LiveRoom.css";

export default function LiveRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useBatches();
  const liveClass = state.classes.find(item => item.id === id);
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [now, setNow] = useState(0);
  const [materialNotes, setMaterialNotes] = useState("");
  const [uploading, setUploading] = useState(false);
  const webrtc = useLiveWebRTC({ classId: id, role: "teacher", active: liveClass?.status === "Live" && liveClass.teacherId === teacherId, message: setMessage });
  useEffect(() => {
    const timer = window.setInterval(() => setNow(value => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const participant = liveClass?.participants?.find(item => item.id === teacherId);
  useEffect(() => {
    if (liveClass?.status === "Live" && !participant) {
      try { joinLiveSession(id, teacherId, liveClass.teacher || "Teacher", "Teacher"); } catch (error) { window.setTimeout(() => setMessage(error.message), 0); }
    }
  }, [id, liveClass?.status, participant, liveClass?.teacher]);
  if (!liveClass || liveClass.teacherId !== teacherId || !["Live", "Completed"].includes(liveClass.status)) return <section className="live-room"><h1>Class unavailable</h1><p>This live room is only available to the assigned teacher while the class is live.</p><button onClick={() => navigate("/teacher/live-classes")}>Back to Live Classes</button></section>;
  const participants = (liveClass.participants || []).filter(item => !item.leftAt);
  const chat = liveClass.chat || [];
  const elapsed = liveClass.status === "Completed" && liveClass.endedAt && liveClass.startedAt ? Math.max(0, Math.floor((new Date(liveClass.endedAt) - new Date(liveClass.startedAt)) / 1000)) : now;
  const timerLabel = `${String(Math.floor(elapsed / 3600)).padStart(2, "0")}:${String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;
  function update(updates) { try { updateLiveParticipant(id, teacherId, updates); } catch (error) { setMessage(error.message); } }
  function sendChat(event) { event.preventDefault(); try { sendLiveChat(id, teacherId, liveClass.teacher || "Teacher", "Teacher", chatMessage); setChatMessage(""); } catch (error) { setMessage(error.message); } }

  function finish() {
    try { endClass(id, teacherId); navigate("/teacher/live-classes"); }
    catch (error) { setMessage(error.message); }
  }
  function resolve(student, approved) {
    try { resolveScreenShare(id, student, approved, teacherId); setMessage(`${approved ? "Approved" : "Rejected"} screen share request.`); }
    catch (error) { setMessage(error.message); }
  }
  async function upload(event) {
    event.preventDefault();
    const file = event.currentTarget.elements.material.files[0];
    try {
      setUploading(true);
      await uploadLectureMaterial(id, file, materialNotes, teacherId);
      event.currentTarget.reset();
      setMaterialNotes("");
      setMessage("Lecture material shared with eligible students.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  }

  const materials = state.materials.filter(item => item.classId === liveClass.id);
  function shareMaterial(materialId) { try { shareLectureMaterial(id, materialId); } catch (error) { setMessage(error.message); } }
  function stopMaterialSharing() { try { stopSharingLectureMaterial(id); } catch (error) { setMessage(error.message); } }
  return <section className="live-room">
    <header><div><span className="live-room-badge">{liveClass.status === "Live" ? "LIVE" : "COMPLETED"}</span><h1>{liveClass.title}</h1><p>{liveClass.course} | {liveClass.batch} | {liveClass.teacher} | {timerLabel}</p></div>{liveClass.status === "Live" ? <button className="live-room-end" onClick={finish}>End Class</button> : <button className="live-room-end" onClick={() => navigate("/teacher/live-classes")}>Back to Classes</button>}</header>
    <div className="live-room-grid"><main><div className="live-stage"><video ref={webrtc.localVideoRef} autoPlay playsInline muted aria-label="Teacher camera preview" /><video className="live-remote-preview" ref={webrtc.remoteVideoRef} autoPlay playsInline aria-label="Student shared screen" /><strong>{webrtc.connectionState}</strong><span>{webrtc.mediaState.camera ? "Camera on" : "Camera off"} | {webrtc.mediaState.mic ? "Microphone on" : "Microphone muted"}</span>{webrtc.mediaState.screen && <small>Screen sharing enabled</small>}{participants.filter(item => item.id !== teacherId).map(item => <div className="live-participant-tile" key={item.id}>{item.name} — Student ({item.camera ? "Camera on" : "Camera off"})</div>)}</div><div className="live-room-controls"><button onClick={() => { webrtc.toggleMic(); update({ mic: !webrtc.mediaState.mic }); }}>{webrtc.mediaState.mic ? "Mute" : "Unmute"} Microphone</button><button onClick={() => { webrtc.toggleCamera(); update({ camera: !webrtc.mediaState.camera }); }}>{webrtc.mediaState.camera ? "Turn Camera Off" : "Turn Camera On"}</button><button onClick={() => webrtc.toggleScreen()}>{webrtc.mediaState.screen ? "Stop Screen Share" : "Share Screen"}</button><button type="button" onClick={() => setMessage(`${participants.length} participant${participants.length === 1 ? "" : "s"} in this session.`)}>Participants</button></div><p className="live-room-note">Frontend demo room. Video and audio streaming will be connected later.</p><section className="live-material-upload"><h2>Lecture Materials</h2><p>Optional: share a PDF, image, document, or presentation. You can continue teaching without uploading one.</p><form onSubmit={upload}><input name="material" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,image/*" required /><textarea value={materialNotes} onChange={event => setMaterialNotes(event.target.value)} placeholder="Material notes (optional)" rows="2" /><button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Upload Material"}</button>    </form>{materials.map(material => <p className="live-material-item" key={material.id}>{material.fileName} <button type="button" onClick={() => shareMaterial(material.id)}>{liveClass.activeSharedMaterial?.materialId === material.id ? "Sharing" : "Share with Students"}</button></p>)}{liveClass.activeSharedMaterial && <p role="status">Sharing: {liveClass.activeSharedMaterial.name} <button type="button" onClick={stopMaterialSharing}>Stop Sharing</button></p>}</section></main><aside className="live-room-panel"><h2>Participants ({participants.length})</h2>{participants.map(item => <p key={item.id}>{item.name} — {item.role}</p>)}<h2>Student Screen Share Requests</h2>{(liveClass.screenShareRequests || []).map(student => <div className="live-request" key={student}><span>{student}</span><button onClick={() => resolve(student, true)}>Approve</button><button onClick={() => resolve(student, false)}>Reject</button></div>)}{!(liveClass.screenShareRequests || []).length && <p>No pending requests.</p>}<h2>Chat</h2><div className="live-chat-placeholder">{chat.map(item => <p key={item.id}><strong>{item.senderName}:</strong> {item.message}</p>)}</div>{liveClass.status === "Live" && <form onSubmit={sendChat}><input value={chatMessage} onChange={event => setChatMessage(event.target.value)} placeholder="Write a message..." /><button type="submit">Send</button></form>}<h2>Notes &amp; Materials</h2><div className="live-chat-placeholder">Shared materials appear in the lecture materials section.</div></aside></div>{message && <p role="status">{message}</p>}</section>;
}
