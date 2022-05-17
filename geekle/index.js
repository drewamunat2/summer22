const app = require("./server");
const db = require("./server/data/db");

db.connect(); //Mongoose Database

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});