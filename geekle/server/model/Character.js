const mongoose = require("mongoose");

/*const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  year: { type: String, required: true },
  correct: { type: String, required: true }
});*/

const thumbnailSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const characteristicSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  species: { type: String, required: true },

  appearsIn: { type: String, required: true },

  genre: { type: String, required: true },

  platform: { type: String, required: true },

  role: { type: String, required: true },
  genRole: { type: String, required: true },

  year: { type: String, required: true },
  decade: { type: String, required: true },

  id: { type: String, required: true }
});

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  selectName: { type: String, required: true },
  shop: { type: String, required: true },
  thumbnail: { thumbnailSchema },
  characteristics : {characteristicSchema}
});

const Char = mongoose.model("Char", CharacterSchema);

module.exports = Char;