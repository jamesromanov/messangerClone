const express = require("express");
const http = require("http");
const app = express();

// app.use("*", (req, res, next) => {
//   res.send("what up!");
// });
server = http.createServer(app);
const io = require("socket.io");
realServer = new io.Server(server, {
  // cors: {
  //   origin: "*",
  // },
  // allowRequest: (req, callback) => {
  //   console.log(req.headers.host, req.headers.origin);
  //   const noOriginHeader = req.headers.host === "localhost:3000";
  //   callback(null, noOriginHeader);
  // },
});
realServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("user left the chat", socket.id);
  });
  socket.on("send-message", (message) => {
    console.log(message);
    app.all("*", (req, res) => {
      res.send(message);
    });
  });
});

server.listen(3000);
