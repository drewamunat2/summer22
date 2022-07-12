const express = require("express");
const CharacterDao = require("../data/CharacterDao");

const router = express.Router();
const characterDao = new CharacterDao();

router.get("/api/characters", async (req, res) => {
    console.log("get characters");
    const { query } = req.query;
    const data = await characterDao.readAll(query);
    console.log("characters: " + data);
    res.json({ data });
});

router.get("/api/characters/:id", async (req, res) => {
    const { id } = req.params;
    console.log("get character with id: " + id);
    const data = await characterDao.read(id);
    console.log("character: " + data);
    res.json({ data: data ? data : [] });
});

router.get("/api/solution", async (req, res) => {
  const { num } = req.query;
  console.log("get solution character index for today: " + num);
  const solution = await characterDao.findByNum(num);
  console.log("solution character: " + solution);
  res.json({ solution });
});

router.post("/api/characters", async (req, res) => {
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
          num
        });
        console.log("new character: " + data);
        res.status(201).json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
        console.error(err.message);
    }
});

router.delete("/api/characters/:id", async (req, res) => {
  console.log("delete character. id: " + req.params);
    try {
        const { id } = req.params;
        console.log("delete character with id: " + id);
        const data = await characterDao.delete(id);
        res.json({ data });
        console.log("deleted character: " + data);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.put("/api/characters/:id", async (req, res) => {
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
        const data = await characterDao.update(id, { 
          name, selectName,
          shop, title, image,
          gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
          num
        });
        res.json({ data });
        console.log("new character: " + data);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;