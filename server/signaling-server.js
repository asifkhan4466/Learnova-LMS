import { randomUUID } from "node:crypto";
import { WebSocket, WebSocketServer } from "ws";

const port = Number(process.env.SIGNALING_PORT || 8080);
const rooms = new Map();

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function leaveRoom(socket, notify = true) {
  if (!socket.classId) return;

  const room = rooms.get(socket.classId);
  if (room) {
    room.delete(socket);
    if (notify) {
      for (const peer of room) {
        send(peer, { type: "peer-left", peerId: socket.peerId });
      }
    }
    if (room.size === 0) rooms.delete(socket.classId);
  }

  socket.classId = undefined;
}

function relayToPeers(socket, message) {
  const room = rooms.get(socket.classId);
  if (!room) return;
  const target = [...room].find(peer => peer.peerId === message.target);
  if (target && target !== socket) send(target, { ...message, peerId: socket.peerId, senderId: socket.peerId });
}

const server = new WebSocketServer({ port });

server.on("connection", (socket) => {
  socket.peerId = randomUUID();

  socket.on("message", (rawMessage) => {
    let message;
    try {
      message = JSON.parse(rawMessage.toString());
    } catch {
      send(socket, { type: "error", message: "Messages must be valid JSON." });
      return;
    }

    const { type } = message;

    if (type === "join-room") {
      const classId = String(message.classId || "").trim();
      if (!classId) {
        send(socket, { type: "error", message: "join-room requires classId." });
        return;
      }

      leaveRoom(socket, false);
      socket.classId = classId;
      socket.peerId = String(message.peerId || socket.peerId);
      socket.role = String(message.role || "participant");

      const room = rooms.get(classId) || new Set();
      const peers = [...room].map((peer) => ({ peerId: peer.peerId, role: peer.role }));
      room.add(socket);
      rooms.set(classId, room);

      send(socket, { type: "room-joined", classId, peerId: socket.peerId, peers });
      for (const peer of room) {
        if (peer !== socket) {
          send(peer, { type: "peer-joined", peerId: socket.peerId, role: socket.role });
        }
      }
      return;
    }

    if (type === "leave-room") {
      leaveRoom(socket);
      send(socket, { type: "room-left" });
      return;
    }

    if (["offer", "answer", "ice-candidate"].includes(type)) {
      if (!socket.classId) {
        send(socket, { type: "error", message: "Join a room before sending signaling messages." });
        return;
      }
      relayToPeers(socket, message);
      return;
    }

    send(socket, { type: "error", message: `Unsupported message type: ${type || "unknown"}.` });
  });

  socket.on("close", () => leaveRoom(socket));
  socket.on("error", () => leaveRoom(socket));
});

server.on("listening", () => {
  console.log(`Learnova signaling server listening on ws://localhost:${port}`);
});
