const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const port = process.env.PORT || 5050;
const debug = require("debug")("geekle");
const http = require("http").Server(app);
const io = require("socket.io")(http);

//data
const db = require("../server/data/db");
const CharacterDao = require("../server/data/CharacterDao");
const sampleCharacters = new CharacterDao();
db.connect();

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

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/game", (req, res) => {
  res.render("game.njk");
});

app.get("/api/characters", async (req, res) => {
  const { query } = req.query;
  const data = await sampleCharacters.readAll(query);
  res.json({ data });
});

app.get("/api/characters/:id", async (req, res) => {
  const { id } = req.params;
  const data = await sampleCharacters.read(id);
  res.json({ data: data ? data : [] });
});

app.post("/api/characters", async (req, res) => {
  try {
    const { name, gender } = req.body;
    const data = await sampleCharacters.create({ name, gender });
    res.status(201).json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.delete("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sampleCharacters.delete(id);
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.put("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender } = req.body;
    const data = await sampleCharacters.update(id, { name, gender });
    res.json({ data });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});