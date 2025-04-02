const socket = io("http://localhost:3000");
const userNamespace = io("http://localhost:3000/user", {
  auth: { token: "Test" },
});

let main = document.querySelector(".main");
let messageInput = document.querySelector("#message");
let roomInput = document.querySelector("#room");
let join = document.querySelector("#join");
let send = document.querySelector("#send");
let form = document.querySelector("#form");
userNamespace.on("connect_error", (error) => {
  displayMessage(error);
});
socket.on("connect", () => {
  displayMessage("you connected with this id" + "  " + socket.id);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
  main.appendChild(div);
});
form.addEventListener("submit", (e) => {
  let msg = messageInput.value;
  let room = roomInput.value;
  if (msg == "") return;
  displayMessage(msg, "right");
  socket.emit("send-message", msg, room); //to send a message
  e.preventDefault();
  messageInput.value = "";
});

join.addEventListener("click", (e) => {
  let room = roomInput.value;
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});
function displayMessage(message, pst = "left") {
  let div = document.createElement("div");
  if (pst === "left") div.style.color = "blue";
  else div.style.color = "black";
  div.textContent = message;
  div.style.textAlign = pst;
  main.appendChild(div);
}
let count = 0;
setInterval(() => {
  socket.emit("count", ++count);
}, 1000);
document.addEventListener("keydown", (e) => {
  if (e.target.matches === "input") return;
  // if (e.key === "c") socket.connect();
  // if (e.key === "d") socket.disconnect();
});
