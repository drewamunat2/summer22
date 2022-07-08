const Character = require("../model/Character");
const ApiError = require("../model/ApiError");

class CharacterDao {
  constructor() {
    this.characters = [];
  }

  // Pre: title and text are not undefined, and title is not empty
  async create({ name, gender }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every note must have a none-empty name!");
    }
    if (gender === undefined || gender === "") {
      throw new ApiError(400, "Every note must have a none-empty gender!");
    }
    const char = await Character.create({ name, gender });
    return char;
  }

  // Pre: id is a valid char ID
  async update(id, { name, gender }) {
    const char = await Character.findByIdAndUpdate(
      id,
      { name, gender },
      { new: true, runValidators: true }
    );  
    if (char === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return char;
  }

  // Pre: id is a valid char ID
  async delete(id) {
    const char = await Character.findByIdAndDelete(id);
    if (char === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return char;
  }

  // Pre: id is a valid char ID
  async read(id) {
    const char = await Character.findById(id);
    return char ? char : [];
  } 

  // returns an empty array if there is no note in the database
  // or no note matches the search query
  async readAll(query = "") {
    if (query !== "") {
      const characters = await Character.find().or([{ name: query }]);
      return characters;
    } 
    const characters = await Character.find({});
    return characters;
  }
}

module.exports = CharacterDao;