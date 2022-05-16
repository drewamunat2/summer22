const { v4: uuidv4 } = require("uuid");

class Character {
  constructor(name, gender) {
    this._id = uuidv4();
    this.name = name;
    this.gender = gender;
  }
}

module.exports = Character;