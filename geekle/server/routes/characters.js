const express = require("express");
const CharacterDao = require("../data/CharacterDao");

const router = express.Router();
const characterDao = new CharacterDao();

router.get("/api/characters", async (req, res) => {
    const { query } = req.query;
    const data = await characterDao.readAll(query);
    res.json({ data });
});

router.get("/api/characters/:id", async (req, res) => {
    const { id } = req.params;
    const data = await characterDao.read(id);
    res.json({ data: data ? data : [] });
});

router.post("/api/characters", async (req, res) => {
    try {
        const { 
          name, selectName,
          shop, thumbnail: { title, image },
          characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
          author
        } = req.body;
        const data = await characterDao.create({ 
          name, selectName,
          shop, thumbnail: { title, image },
          characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
          author
        });
        res.status(201).json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.delete("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await characterDao.delete(id);
        res.json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.put("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
          name, selectName,
          shop, thumbnail: { title, image },
          characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
          author
        } = req.body;
        const data = await characterDao.update(id, { 
          name, selectName,
          shop, thumbnail: { title, image },
          characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade, id },
          author
        });
        res.json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;