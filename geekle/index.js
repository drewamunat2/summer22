const app = require("./server");
const db = require("./server/data/db");
const http = require("http").Server(app);
const io = require("socket.io")(http);

db.connect(); //Mongoose Database

const port = process.env.PORT || 5050;

//on connection with each client
io.on("connection", (socket) => {
  socket.on("guess", (msg) => {
    debug(`guess: ${msg.message}`);
    msg.gender = "male";
    msg.show = "Superman";
    msg.
    io.emit("message", msg);
  });
  
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});