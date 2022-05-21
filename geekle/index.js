const connection = require("./server/data/connection");
const app = require("./server");
const db = require("./server/data/db");
const http = require("http").Server(app);

db.connect(); //Mongoose Database
connection.main();  //Geekle-list connect

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});