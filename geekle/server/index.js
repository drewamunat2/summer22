const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const port = process.env.PORT || 5050;
const debug = require("debug")("geekle");
const http = require("http").Server(app);
const io = require("socket.io")(http);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.render("index.njk", null);
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});

