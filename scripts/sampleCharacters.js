const db = require("../server/data/db");
const CharacterDao = require("../server/data/CharacterDao");
const Character = require("../server/model/Character");

const characters = new CharacterDao();

async function createSampleCharacters() {
  try {
    await db.connect();
    await Character.deleteMany({});
    const char = await characters.create({
      name: "Batman",
      selectName: "Batman (The Batman) [mv]",
      shop: "https://galaxycon.com/collections/batman",
      title: "Batman",
      image: "https://cdn.shopify.com/s/files/1/0275/9209/7837/products/PXL_20220627_191521728_470x.jpg?v=1656366154",
      gender: "male", species: "Human",
      appearsIn: "Batman", bothAppearsIn: ["Batman", "Batman v Superman", "Batman vs Robin", "Batman vs Teenage Mutant Ninja Turtles", "Gotham", "Scooby-Doo Meets Batman", "The Batman/Tarzan Adventure Hour", "Super Friends", "Crisis on Infinite Earths", "Justice League", "Justice League vs Teen Titans",  "Young Justice", "Injustice", "MULTIVERUS", "Mortal Kombat vs. DC Universe", "Lego Dimensions"],
      genre: "superhero", allGenres: ["superhero", "crime film", "mystery", "drama", "action-adventure", "action", "adventure"],
      platform: "movies", allPlatforms: ["movies", "tv series", "video games"], owner: "DC Comics", trademarkOwner: "DC COMICS", network: "Warner Bros. Pictures", universe: "DC",
      role: "titular protagonist", genRole: "good",
      year: 1939, decade: 1930, num:0
    });
    console.log(char);
  } catch (err) {
    console.log(err);
  }
}

createSampleCharacters();