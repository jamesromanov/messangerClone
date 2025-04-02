const express = require("express");
const http = require("http");
const app = express();

server = http.createServer(app);
const io = require("socket.io");
realServer = new io.Server(server, {
  cors: {
    origin: "*",
  },
  // allowRequest: (req, callback) => {
  //   console.log(req.headers.host, req.headers.origin);
  //   const noOriginHeader = req.headers.host === "localhost:0";
  //   callback(null, noOriginHeader);
  // },
});
console.log("salom");
realServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("user left the chat", socket.id);
  });
  socket.on("send-message", (message) => {
    console.log(message);
    socket.emit("receive-message", message);
  });
});

server.listen(3000);
