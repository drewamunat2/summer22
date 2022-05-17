const db = require("../server/data/db");
const CharacterDao = require("../server/data/CharacterDao");

async function createSampleCharacters() {
  try {
    await db.connect();

    const characters = new CharacterDao();
    const character = await characters.create({
        name: "Batman",
        gender: "male",
    });
    console.log(character);
    const character2 = await characters.create({
        name: "Superman",
        gender: "male",
    });
    console.log(character2);
    const character3 = await characters.create({
        name: "Skeletor",
        gender: "male",
    });
    console.log(character3);
  } catch (err) {
    console.log(err);
  }
}

createSampleCharacters();