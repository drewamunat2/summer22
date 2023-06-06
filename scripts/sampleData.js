const db = require("../server/data/db");
const User = require("../server/model/User");
const Character = require("../server/model/Character");
const UserDao = require("../server/data/UserDao");
const CharacterDao = require("../server/data/CharacterDao");

const users = new UserDao();
const characters = new CharacterDao();

async function createSampleUser(username, role) {
  return users.create({
    username: username,
    password: username,
    role,
  });
}

async function createSampleCharacter(name, selectName,
  shop, title, image,
  gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
  num, author) {
  await characters.create({ 
    name, selectName,
    shop, title, image,
    gender, species, appearsIn, bothAppearsIn, genre, allGenres, platform, allPlatforms, owner, trademarkOwner, network, universe, role, genRole, year, decade,
    num, author
  });
}

async function createSampleData() {
  try {
    await db.connect();         // this should not be your production database!!
    await User.deleteMany({});  // delete all users!
    await Character.deleteMany({});  // delete all characters!
    
    const user3 = await createSampleUser("admin1", "ADMIN");
    await createSampleCharacter("Batman", "Batman (The Batman) [mv]", "https://galaxycon.com/collections/batman",
    "Batman", "https://cdn.shopify.com/s/files/1/0275/9209/7837/products/PXL_20220627_191521728_470x.jpg?v=1656366154",
    "male", "Human",
    "Batman", ["Batman", "Batman v Superman", "Batman vs Robin", "Batman vs Teenage Mutant Ninja Turtles", "Gotham", "Scooby-Doo Meets Batman", "The Batman/Tarzan Adventure Hour", "Super Friends", "Crisis on Infinite Earths", "Justice League", "Justice League vs Teen Titans",  "Young Justice", "Injustice", "MULTIVERUS", "Mortal Kombat vs. DC Universe", "Lego Dimensions"],
    "superhero", ["superhero", "crime film", "mystery", "drama", "action-adventure", "action", "adventure"],
    "movies", ["movies", "tv series", "video games"], "DC Comics", "DC COMICS", "Warner Bros. Pictures", "DC",
    "titular protagonist", "good", 1939, 1930, 0, user3._id);
    console.log("Samples created!");
  } catch (err) {
    console.log(err);
  }
}

createSampleData();