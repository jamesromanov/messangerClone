const { io } = require("socket.io-client");
const express = require("express");
const http = require("http");
const app = express();

app.all("*", (req, res, next) => {
  res.send("hel");
});

server = http.createServer(app);

const socket = io("http://localhost:3000");

// form.addEventListener("submit", (e) => {
//   socket.emit("send-message", messageInput.value); //to send a message
//   e.preventDefault();
//   messageInput.value = "";
// });
// function displayMessage(message) {
//   let div = document.createElement("div");
//   div.textContent = message;
//   main.appendChild(div);
// }

socket.on("connect", (socket) => {
  console.log("socket connected here", socket);
});
socket.emit("send-message", "s");
server.listen(4000);
