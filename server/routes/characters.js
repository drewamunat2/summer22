const express = require("express");
const CharacterDao = require("../data/CharacterDao");
const ApiError = require("../model/ApiError");
const { checkToken } = require("../util/middleware");

const router = express.Router();
const characterDao = new CharacterDao();

router.get("/api/characters", async (req, res, next) => {
  try{
    console.log("get characterswith query: " + req.query);
    const { query } = req.query;
    const data = await characterDao.readAll(query);
    console.log("characters: " + data);
    res.json({ data });
  } catch (err) {
    next(err);
  }
});

router.get("/api/characters/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("get character with id: " + id);
  const data = await characterDao.read(id);
  console.log("character: " + data);
  res.json({ data: data ? data : [] });
});

router.get("/api/getCharacter", async (req, res, next) => {
  const { name } = req.query;
  console.log("get character with name: " + name);
  const data = await characterDao.findByName(name);
  console.log("character: " + data);
  res.json({ data: data ? data : [] });
});

router.get("/api/names", async (req, res, next) => {
  console.log("get character names");
  const names = await characterDao.readAllNames();
  names.sort();
  console.log("character names: " + names);
  res.json({ names });
});

router.get("/api/selectNames", async (req, res, next) => {
  console.log("get character select names");
  const names = await characterDao.readAllSelectNames();
  names.sort();
  console.log("character select names: " + names);
  res.json({ names });
});

router.get("/api/solution", async (req, res, next) => {
  const { num } = req.query;
  const characters = await characterDao.readAll();
  const solutionIndex = num % characters.length;
  console.log("get solution character index for today: " + solutionIndex);
  const solution = characters[solutionIndex];
  console.log("solution character: " + solution);
  res.json({ solution });
});

router.post("/api/characters", checkToken, async (req, res, next) => {
  console.log("post character.  req.body:" + req.body);
    try {
        const { 
          name, selectName,
          shop, title, image,
          gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
          num
        } = req.body;
        console.log(name)
        console.log(selectName)
        const data = await characterDao.create({ 
          name, selectName,
          shop, title, image,
          gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
          num, author: req.user.sub
        });
        console.log("new character: " + data);
        res.status(201).json({ data });
      } catch (err) {
        next(err);
      }
});

router.delete("/api/characters/:id", checkToken, async (req, res, next) => {
  console.log("delete character. id: " + req.params);
    try {
        const { id } = req.params;
        console.log("delete character with id: " + id);
        const data = await characterDao.delete(req.user.sub, id);
        res.json({ data });
        console.log("deleted character: " + data);
      } catch (err) {
        next(err);
      }
});

router.put("/api/characters/:id", checkToken, async (req, res, next) => {
  console.log("put character. id: " + req.params);
    try {
        const { id } = req.params;
        console.log("put character with id: " + id);
        const { 
          name, selectName,
          shop, title, image,
          gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
          num
        } = req.body;
        const data = await characterDao.update(req.user.sub, id, { 
          name, selectName,
          shop, title, image,
          gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
          num
        });
        res.json({ data });
        console.log("new character: " + data);
      } catch (err) {
        next(err);
      }
});

module.exports = router;