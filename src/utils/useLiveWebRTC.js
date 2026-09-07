import { useCallback, useEffect, useRef, useState } from "react";

const SIGNALING_URL = import.meta.env.VITE_SIGNALING_URL || "ws://localhost:8080";
const ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];

export default function useLiveWebRTC({ classId, role, active, message }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const socketRef = useRef(null);
  const peersRef = useRef(new Map());
  const localStreamRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const [connectionState, setConnectionState] = useState("Connecting...");
  const [mediaState, setMediaState] = useState({ mic: true, camera: true, screen: false });
  const [error, setError] = useState("");

  const report = useCallback(value => {
    setError(value instanceof Error ? value.message : String(value));
    if (message) message(value instanceof Error ? value.message : String(value));
  }, [message]);

  const closePeer = useCallback(peerId => {
    const peer = peersRef.current.get(peerId);
    if (peer) peer.close();
    peersRef.current.delete(peerId);
  }, []);

  const createPeer = useCallback((peerId, peerRole) => {
    const existing = peersRef.current.get(peerId);
    if (existing) return existing;
    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peersRef.current.set(peerId, peer);
    const stream = localStreamRef.current;
    stream?.getTracks().forEach(track => peer.addTrack(track, stream));
    peer.onicecandidate = event => {
      if (event.candidate && socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: "ice-candidate", target: peerId, candidate: event.candidate }));
      }
    };
    peer.ontrack = event => {
      const [remoteStream] = event.streams;
      if (remoteVideoRef.current && remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play().catch(() => {});
      }
    };
    peer.onconnectionstatechange = () => {
      if (["failed", "closed", "disconnected"].includes(peer.connectionState)) closePeer(peerId);
      setConnectionState(peer.connectionState);
    };
    peer.peerRole = peerRole;
    return peer;
  }, [closePeer]);

  const sendOffer = useCallback(async (peerId, peerRole) => {
    const peer = createPeer(peerId, peerRole);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socketRef.current?.send(JSON.stringify({ type: "offer", target: peerId, offer }));
  }, [createPeer]);

  const renegotiate = useCallback(async (peerId, peer) => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socketRef.current?.send(JSON.stringify({ type: "offer", target: peerId, offer }));
  }, []);

  useEffect(() => {
    if (!active || !classId || (!window.isSecureContext && location.hostname !== "localhost" && location.hostname !== "127.0.0.1")) return undefined;
    let disposed = false;
    async function start() {
      try {
        if (role === "teacher") {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (disposed) { stream.getTracks().forEach(track => track.stop()); return; }
          cameraStreamRef.current = stream;
          localStreamRef.current = stream;
          if (localVideoRef.current) { localVideoRef.current.srcObject = stream; localVideoRef.current.muted = true; await localVideoRef.current.play().catch(() => {}); }
        }
        const socket = new WebSocket(SIGNALING_URL);
        socketRef.current = socket;
        socket.onopen = () => {
          setConnectionState("Connected");
          socket.send(JSON.stringify({ type: "join-room", classId, role }));
        };
        socket.onerror = () => report("Signaling connection failed. Start the local signaling server and try again.");
        socket.onclose = () => setConnectionState("Disconnected");
        socket.onmessage = async event => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "room-joined" && role === "teacher") {
              for (const peer of data.peers || []) await sendOffer(peer.peerId, peer.role);
            }
            if (data.type === "peer-joined" && role === "teacher") await sendOffer(data.peerId, data.role);
            if (data.type === "offer") {
              const peer = createPeer(data.peerId || data.senderId, data.role);
              await peer.setRemoteDescription(data.offer);
              const answer = await peer.createAnswer();
              await peer.setLocalDescription(answer);
              socket.send(JSON.stringify({ type: "answer", target: data.peerId, answer }));
            }
            if (data.type === "answer") await peersRef.current.get(data.peerId || data.senderId)?.setRemoteDescription(data.answer);
            if (data.type === "ice-candidate") await peersRef.current.get(data.peerId || data.senderId)?.addIceCandidate(data.candidate);
            if (data.type === "peer-left") closePeer(data.peerId);
          } catch (eventError) { report(eventError); }
        };
      } catch (mediaError) {
        report(mediaError.name === "NotAllowedError" ? "Camera or microphone permission was denied." : "Camera or microphone is not available.");
      }
    }
    start();
    return () => {
      disposed = true;
      if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(JSON.stringify({ type: "leave-room", classId }));
      socketRef.current?.close();
      peersRef.current.forEach(peer => peer.close());
      peersRef.current.clear();
      const localStream = localStreamRef.current;
      const screenStream = screenStreamRef.current;
      localStream?.getTracks().forEach(track => track.stop());
      screenStream?.getTracks().forEach(track => track.stop());
      socketRef.current = null;
      localStreamRef.current = null;
      cameraStreamRef.current = null;
      screenStreamRef.current = null;
    };
  }, [active, classId, closePeer, createPeer, role, report, sendOffer]);

  const toggleTrack = useCallback(kind => {
    const track = localStreamRef.current?.getTracks().find(item => item.kind === kind);
    if (!track) return;
    track.enabled = !track.enabled;
    setMediaState(value => ({ ...value, [kind === "audio" ? "mic" : "camera"]: track.enabled }));
  }, []);

  const restoreCamera = useCallback(() => {
    const camera = cameraStreamRef.current?.getVideoTracks()[0];
    peersRef.current.forEach(peer => peer.getSenders().find(sender => sender.track?.kind === "video")?.replaceTrack(camera));
    screenStreamRef.current?.getTracks().forEach(track => track.stop());
    localStreamRef.current = cameraStreamRef.current;
    if (localVideoRef.current) localVideoRef.current.srcObject = cameraStreamRef.current;
    setMediaState(value => ({ ...value, screen: false }));
  }, []);

  const toggleScreen = useCallback(async () => {
    if (mediaState.screen) {
      restoreCamera();
      return;
    }
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const screenTrack = screenStream.getVideoTracks()[0];
      peersRef.current.forEach(peer => peer.getSenders().find(sender => sender.track?.kind === "video")?.replaceTrack(screenTrack));
      screenTrack.onended = restoreCamera;
      screenStreamRef.current = screenStream;
      const outboundStream = new MediaStream([screenTrack, ...(cameraStreamRef.current?.getAudioTracks() || [])]);
      localStreamRef.current = outboundStream;
      peersRef.current.forEach((peer, peerId) => {
        if (role === "student" && !peer.getSenders().some(sender => sender.track === screenTrack)) peer.addTrack(screenTrack, outboundStream);
        if (role === "student") renegotiate(peerId, peer).catch(report);
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = outboundStream;
      setMediaState(value => ({ ...value, screen: true }));
    } catch (screenError) {
      if (screenError.name !== "AbortError") report("Screen sharing could not be started.");
    }
  }, [mediaState.screen, renegotiate, report, restoreCamera, role]);

  return { localVideoRef, remoteVideoRef, mediaState, connectionState, error, toggleMic: () => toggleTrack("audio"), toggleCamera: () => toggleTrack("video"), toggleScreen };
}
