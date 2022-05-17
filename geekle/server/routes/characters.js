const express = require("express");
const CharacterDao = require("../data/CharacterDao");

const router = express.Router();
const sampleCharacters = new CharacterDao();

router.get("/api/characters", async (req, res) => {
    const { query } = req.query;
    const data = await sampleCharacters.readAll(query);
    res.json({ data });
});

router.get("/api/characters/:id", async (req, res) => {
    const { id } = req.params;
    const data = await sampleCharacters.read(id);
    res.json({ data: data ? data : [] });
});

router.post("/api/characters", async (req, res) => {
    try {
        const { name, gender } = req.body;
        const data = await sampleCharacters.create({ name, gender });
        res.status(201).json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.delete("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await sampleCharacters.delete(id);
        res.json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

router.put("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, gender } = req.body;
        const data = await sampleCharacters.update(id, { name, gender });
        res.json({ data });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
});

module.exports = router;