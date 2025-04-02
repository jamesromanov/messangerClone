const { instrument } = require("@socket.io/admin-ui");

const express = require("express");
const http = require("http");
const app = express();

server = http.createServer(app);
const io = require("socket.io");
realServer = new io.Server(server, {
  cors: {
    origin: ["http://localhost", "https://admin.socket.io"],
    credentials: true,
  },
  // allowRequest: (req, callback) => {
  //   console.log(req.headers.host, req.headers.origin);
  //   const noOriginHeader = req.headers.host === "localhost:0";
  //   callback(null, noOriginHeader);
  // },
});
console.log("salom");

const userNamespace = realServer.of("/user");
userNamespace.on("connection", (socket) => {
  console.log(socket.username);
  console.log("connected user with " + socket.username);
});
userNamespace.use((socket, next) => {
  console.log(socket.handshake.auth.token);
  if (socket.handshake.auth.token) {
    socket.username = getUserNameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("Please enter token!"));
  }
}); // to set up diffirent middleware!

function getUserNameFromToken(token) {
  return token;
}
realServer.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("disconnect", () => {
    console.log("user left the chat", socket.id);
  });
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
      // socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }

    // console.log(message);
    //sending the message to the only user that is connected!
    //socket.broadcast.emit

    // by default everysingle socket io has got their room
    //for example they have room with their ids

    //socket.join()  is for joining custom rooms
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
  socket.on("count", (count) => {
    console.log(count);
  });
});

instrument(realServer, { auth: false, mode: "development" });
server.listen(3000);
