//local
require("dotenv").config();

//app
const express = require("express");
const app = express();

//middleware
const helmet = require("helmet");
const cors = require("cors");

//server
const nunjucks = require("nunjucks");
const debug = require("debug")("geekle");

//data
const characters = require("../server/routes/characters.js");

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
app.use(helmet());
app.use(cors());
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
app.use(characters);

module.exports = app;