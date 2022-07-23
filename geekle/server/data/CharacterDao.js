const Character = require("../model/Character");
const ApiError = require("../model/ApiError");
const mongoose = require("mongoose");

class CharacterDao {
  constructor() {
    this.characters = [];
  }

  // Pre: title and text are not undefined, and title is not empty, and author is a valid author username
  async create({ 
    name, selectName,
    shop, title, image,
    gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
    num, author
  }) {
    console.log("create method")
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every note must have a none-empty name!");
    }
    if(this.findByName(name).name && this.findByName(name).name === name){
      throw new ApiError(400, "Every note must have a unique name!");
    }
    if(this.findByNum(num).num && this.findByNum(num).num === num){
      throw new ApiError(400, "Every note must have a unique num!");
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
    if (!author || !mongoose.isValidObjectId(author)) {
      throw new ApiError(400, "Every note must have an author!");
    }
    const char = await Character.create({ 
      name, selectName,
      shop, title, image,
      gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
      num, author
    });
    console.log("created character: " + char, char.author.toString());
    return {...char, author: char.author.toString()};
  }

  // Pre: id is a valid char ID and author is a valid author username
  async update(author, id, { 
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
        num, author
      },
      { new: true, runValidators: true }
    );  
    console.log("updated character: " + char);
    if (char === null) {
      throw new ApiError(404, "There is no note with the given ID!");
    }
    return {...char, author: char.author.toString()};
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

  // Pre: num is a valid index in the character list
  async findByNum(num) {
    console.log("findByNum method. num: " + num);
    const solution = await Character.find().or([{ num: num }]);
    console.log("solution: " + solution);
    return solution;
  }

  async findByName(name) {
    console.log("findByName method. name: " + name);
    const character = await Character.find().or([{ name: name }]);
    console.log("character: " + character);
    return character;
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
    console.log("read all characters")
    return characters;
  }

  async readAllNames() {
    console.log("read all names method"); 
    const characters = await Character.find({}); 
    let names = characters.map(function(a) {return a.name;});
    console.log(names);
    return names;
  }

  async readAllSelectNames() {
    console.log("read all select names method"); 
    const characters = await Character.find({}); 
    let names = characters.map(function(a) {return a.selectName;});
    console.log(names);
    return names;
  }
}

module.exports = CharacterDao;