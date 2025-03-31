const express = require("express");
const app = express();
const http = require("http");
server = http.createServer(app);
app.use(express.static("another"));
app.get("*", (req, res) => {
  res.send("new thing come up just now");
});
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("another server connected here");
});

server.listen(2000);
