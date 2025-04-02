const socket = io("http://localhost:3000");

let main = document.querySelector(".main");
let messageInput = document.querySelector("#message");
let roomInput = document.querySelector("#room");
let join = document.querySelector("#join");
let send = document.querySelector("#send");
let form = document.querySelector("#form");

socket.on("connect", () => {
  displayMessage("you connected with this id" + "  " + socket.id);
});
socket.on("receive-message", (message) => {
  displayMessage(message);
});
form.addEventListener("submit", (e) => {
  let msg = messageInput.value;
  socket.emit("send-message", msg); //to send a message
  e.preventDefault();
  messageInput.value = "";
});
function displayMessage(message) {
  let div = document.createElement("div");
  div.textContent = message;
  main.appendChild(div);
}
