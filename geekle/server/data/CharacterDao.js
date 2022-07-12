const Character = require("../model/Character");
const ApiError = require("../model/ApiError");

class CharacterDao {
  constructor() {
    this.characters = [];
  }

  // Pre: title and text are not undefined, and title is not empty
  async create({ 
    name, selectName,
    shop, title, image,
    gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
    num
  }) {
    console.log("create method")
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every note must have a none-empty name!");
    }
    if (selectName === undefined || selectName === "") {
      throw new ApiError(400, "Every note must have a none-empty selectName!");
    }
    if (shop === undefined || shop === "") {
      throw new ApiError(400, "Every note must have a none-empty shop!");
    }
    if (title === undefined || title === "") {
      throw new ApiError(400, "Every note must have a none-empty title!");
    }
    if (image === undefined || image === "") {
      throw new ApiError(400, "Every note must have a none-empty image!");
    }
    if (gender === undefined || gender === "") {
      throw new ApiError(400, "Every note must have a none-empty gender!");
    }
    if (appearsIn === undefined || appearsIn === "") {
      throw new ApiError(400, "Every note must have a none-empty appearsIn!");
    }
    if (platform === undefined || platform === "") {
      throw new ApiError(400, "Every note must have a none-empty platform!");
    }
    if (genre === undefined || genre === "") {
      throw new ApiError(400, "Every note must have a none-empty genre!");
    }
    if (owner === undefined || owner === "") {
      throw new ApiError(400, "Every note must have a none-empty owner!");
    }
    if (trademarkOwner === undefined || trademarkOwner === "") {
      throw new ApiError(400, "Every note must have a none-empty trademarkOwner!");
    }
    if (network === undefined || network === "") {
      throw new ApiError(400, "Every note must have a none-empty network!");
    }
    if (universe === undefined || universe === "") {
      throw new ApiError(400, "Every note must have a none-empty universe!");
    }
    if (role === undefined || role === "") {
      throw new ApiError(400, "Every note must have a none-empty role!");
    }
    if (genRole === undefined || genRole === "") {
      throw new ApiError(400, "Every note must have a none-empty owner!");
    }
    if (year === undefined || year === "") {
      throw new ApiError(400, "Every note must have a none-empty year!");
    }
    if (decade === undefined || decade === "") {
      throw new ApiError(400, "Every note must have a none-empty decade!");
    }
    if (num === undefined || num === "") {
      throw new ApiError(400, "Every note must have a none-empty num!");
    }
    const char = await Character.create({ 
      name, selectName,
      shop, title, image,
      gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
      num
    });
    console.log("created character: " + char);
    return char;
  }

  // Pre: id is a valid char ID
  async update(id, { 
    name, selectName,
    shop, title, image,
    gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
    num
  }) {
    console.log("update method")
    const char = await Character.findByIdAndUpdate(
      id,
      { name, selectName,
        shop, title, image,
        gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
        num
      },
      { new: true, runValidators: true }
    );  
    console.log("updated character: " + char);
    if (char === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return char;
  }

  // Pre: id is a valid char ID
  async delete(id) {
    console.log("delete method")
    const char = await Character.findByIdAndDelete(id);
    if (char === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    console.log("deleted character: " + char);
    return char;
  }

  // Pre: id is a valid char ID
  async read(id) {
    console.log("read method. id: " + id);
    const char = await Character.findById(id);
    console.log("read character: " + char);
    return char ? char : [];
  } 

  // returns an empty array if there is no note in the database
  // or no note matches the search query
  async readAll(query = "") {
    console.log("read all method. query: " + query);
    if (query !== "") {
      const characters = await Character.find().or([{ name: query, selectName: query }]);
      console.log("read all characters: " + characters)
      return characters;
    } 
    const characters = await Character.find({});
    console.log("read no characters")
    return characters;
  }
}

module.exports = CharacterDao;