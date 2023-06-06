const {MongoClient} = require('mongodb');
//import Realm from "realm";
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

module.exports = charResults;