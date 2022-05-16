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
    const char = new Character(name, gender);
    this.characters.push(char);
    return char;
  }

  // Pre: id is a valid note ID
  async update(id, { name, gender }) {
    const index = this.characters.findIndex((char) => char._id === id);
    if (index === -1) {
      throw new ApiError(404, "There is no character with the given ID!");
    }
    if (name !== undefined) {
      this.characters[index].name = name;
    }
    if (gender !== undefined) {
      this.characters[index].gender = gender;
    }
    return this.characters[index];
  }

  // Pre: id is a valid note ID
  async delete(id) {
    const index = this.characters.findIndex((char) => char._id === id);
    if (index === -1) {
      throw new ApiError(404, "There is no character with the given ID!");
    }
    const char = this.characters[index];
    this.characters.splice(index, 1);
    return char;
  }

  // Pre: id is a valid note ID
  async read(id) {
    return this.characters.find((char) => char._id === id);
  } 

  async readAll(query = "") {
    if (query !== "") {
      return this.characters.filter(
        (char) => char.name.includes(query)
      );
    }
    return this.characters;
  }
}

module.exports = CharacterDao;