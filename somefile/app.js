const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast to all clients
  });
});

server.listen(9000, () => {
  console.log("Server running on port 3000");
});
