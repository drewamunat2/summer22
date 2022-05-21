const app = require("./server");
const db = require("./server/data/db");
const connection = require("./server/data/connection");
const http = require("http").Server(app);

db.connect(); //Mongoose Database
//connection.connect(); need to make a connect function

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});