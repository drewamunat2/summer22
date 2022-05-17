const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
});

const Char = mongoose.model("Char", CharacterSchema);

module.exports = Char;