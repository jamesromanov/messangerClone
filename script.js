const { io } = require("socket.io-client");
const express = require("express");
const http = require("http");
const app = express();

app.use(express.static("index"));

app.all("*", (req, res, next) => {
  res.send("hel");
});

server = http.createServer(app);

const socket = io("http://localhost:3000");

socket.on("connect", (socket) => {
  console.log("socket connected here", socket);
});
socket.emit("send-message", "whats up");
server.listen(4000);
