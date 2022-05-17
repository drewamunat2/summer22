//app
const express = require("express");
const app = express();
const port = process.env.PORT || 5050;

//more app
const nunjucks = require("nunjucks");
const debug = require("debug")("geekle");
const http = require("http").Server(app);
const io = require("socket.io")(http);

//data
const db = require("../server/data/db");
const characters = require("../server/routes/characters")
db.connect(); //mongoose

//dummy array
const charactersArray = [
  "Batman",
  "Superman",
  "Darth Vader",
  "Bubbles",
  "Goku",
  "Harry Potter",
  "Captain Kirk",
  "Zelda",
  "Skeletor",
  "Mario",
  "Rick O’Connell",
  "Gill-Man",
  "Frank N. Furter"
];

//templating
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//middleware
app.use(express.static("assets"));
app.use(express.json());

//server
app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/game", (req, res) => {
  res.render("game.njk");
});

//routing
app.use(express.static("characters"));

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});