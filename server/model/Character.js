const mongoose = require("mongoose");

/*const CharacteristicsSchema = new mongoose.Schema({
  gender: {type: String, required: true, lowercase: true},
  species: {type: String, required: true, lowercase: true},
  appearsIn: {type: String, required: true},
  bothAppearsIn: {type: [String], required: true},
  genre: {type: String, required: true, lowercase: true},
  allGenres: {type: [String], required: true, lowercase: true},
  platform: {type: String, required: true, lowercase: true},
  allPlatforms: {type: [String], required: true, lowercase: true},
  owner: {type: String, required: true},
  trademarkOwner: {type: String, required: true},
  network: {type: String, required: true},
  universe: {type: String, required: true}, 
  role: {type: String, required: true, lowercase: true},
  genRole: {type: String, required: true, lowercase: true}, 
  year: {type: Number, required: true},
  decade: {type: Number, required: true},
});

const ThumbnailSchema = new mongoose.Schema({
  title: {type: String, required: true},
  image: {type: String, required: true},
});*/

const CharacterSchema = new mongoose.Schema({
  name: {type: String, index: true, unique: true, required: true},
  selectName: {type: String, index: true, unique: true, required: true},
  shop: {type: String, required: true},
  title: {type: String, required: true},
  image: {type: String, required: true},
  gender: {type: String, required: true, lowercase: true},
  species: {type: String, required: true, lowercase: true},
  appearsIn: {type: String, required: true},
  bothAppearsIn: {type: [String], required: true, default: undefined},
  genre: {type: String, required: true, lowercase: true},
  allGenres: {type: [String], required: true, lowercase: true, default: undefined},
  platform: {type: String, required: true, lowercase: true},
  allPlatforms: {type: [String], required: true, lowercase: true, default: undefined},
  owner: {type: String, required: true},
  trademarkOwner: {type: String, required: true},
  network: {type: String, required: true},
  universe: {type: String, required: true}, 
  role: {type: String, required: true, lowercase: true},
  genRole: {type: String, required: true, lowercase: true}, 
  year: {type: Number, required: true},
  decade: {type: Number, required: true},
  createdAt: {type: Date, immutable: true, default: () => Date.now()},
  updatedAt: {type: Date, default: () => Date.now()},
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  num: {type: Number, index: true, unique: true, required: true}
});

CharacterSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

/*CharacterSchema.post("save", function(docs, next) {
  console.log(`made by ${docs.author.username}`)
  next();
});*/

const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;