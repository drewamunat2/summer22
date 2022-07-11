//local
/*require("dotenv").config();
const {MongoClient} = require('mongodb');

//path
const path = require('path');
const assetsPath = path.join(__dirname, '/../assets');

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

const fetchCharacters = async () => {
  const url = 'http://localhost:3001/characters';
  fetch(url)
    .then(res => res.json())
    .then(json => {
      // randomly generate int 0-12
      console.log(json);
      return ;
  });
};

document.addEventListener("DOMContentLoaded", (_event) => {
  fetchCharacters();
});

async function main() {
	// we'll add code here soon

  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   /
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
app.use(express.static(assetsPath));

app.use(express.json());

//server
app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.get("/game", (req, res) => {
  res.render("game.njk", null);
});

//routing
app.use('/game', characters);

module.exports = app;*/

require("dotenv").config();
const characters = require("./routes/characters.js");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");
const { globalErrorHandler } = require("./util/middleware");
const cors = require("cors");
const helmet = require("helmet");

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

//server
const nunjucks = require("nunjucks");

app.get("/", (req, res) => {
  res.send("Geekle Character API!");
});

// routing
app.use(characters);
app.use(users);
app.use(auth);

app.use(globalErrorHandler);

module.exports = app;