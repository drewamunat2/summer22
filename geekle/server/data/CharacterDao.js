const Character = require("../model/Character");
const ApiError = require("../model/ApiError");

class CharacterDao {
  constructor() {
    this.characters = [];
  }

  // Pre: title and text are not undefined, and title is not empty
  async create({ 
    name, selectName,
    shop, thumbnail: { title, image },
    characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
    author
  }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every note must have a none-empty name!");
    }
    if (selectName === undefined || selectName === "") {
      throw new ApiError(400, "Every note must have a none-empty selectName!");
    }
    const char = await Character.create({ 
      name, selectName,
      shop, thumbnail: { title, image },
      characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
      author
    });
    return char;
  }

  // Pre: id is a valid char ID
  async update(id, { 
    name, selectName,
    shop, thumbnail: { title, image },
    characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
    author
  }) {
    const char = await Character.findByIdAndUpdate(
      id,
      { name, selectName,
        shop, thumbnail: { title, image },
        characteristics : { gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade },
        author
      },
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
      const characters = await Character.find().or([{ name: query, selectName: query }]);
      return characters;
    } 
    const characters = await Character.find({});
    return characters;
  }
}

module.exports = CharacterDao;