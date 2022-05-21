//local
require("dotenv").config();
const {MongoClient} = require('mongodb');

//app
const express = require("express");
const app = express();

//middleware
const helmet = require("helmet");
const cors = require("cors");

//server
const nunjucks = require("nunjucks");
const debug = require("debug")("geekle");

//data
const characters = require("../server/routes/characters.js");

//------------------------------------------

let charResults = {};

async function main() {
	// we'll add code here soon

  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://drewamunat2:8SIQTQeHcJnjpCzq@geekle-characters.gaskn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  const charMap = new Map();
  const characteristics = {
    name: '',
    gender: '',
    genre: '',
    creator: '',
    platform: '',
    year: '',
    correct: ''
  }

  try {
    await client.connect();

    await listDatabases(client);

    charResults = await findCharacters(client);


  
  } catch (e) {
    console.error(e);
  }

  finally {
    await client.close();
  } 

}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  //console.log("Databases:");
  //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findCharacters(client) {
  const cursor = client
    .db('geekle-characters')
    .collection('geekle-characters-list')
    .find()
  const results = await cursor.toArray();
  if (results.length > 0) {
    //console.log(`Found ${results.length} character(s):`);
    results.forEach((result, i) => {
      //console.log(result);
    });
  }
  //console.log(results);
  return results;
}

console.log(charResults);

//-------------------------------------------

//templating
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

//middleware
app.use(helmet());
app.use(cors());
app.use(express.static("assets"));
app.use(express.json());

//server
app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/game", (req, res) => {
  res.render("game.njk");
});

//routing
app.use(characters);

module.exports = app;