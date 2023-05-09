const express = require("express");
const { getTopics } = require("./controllers/topics.controllers.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("*",(req, res) => {
  res.status(500).send({ msg: "Invalid Path!" });
});


module.exports = app