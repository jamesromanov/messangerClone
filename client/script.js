const express = require("express");
const { renderPage } = require("./render.controller");

const app = express();

app.get("/", renderPage);
app.use(express.static("html"));
app.set("view engine", "ejs");
app.set("views", "html");

app.listen(80);
