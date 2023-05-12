const express = require("express");
const { getTopics } = require("../controllers/topics.controllers.js");
const {
  getArticleById,
  getArticles,
  getCommentByArticleId,
  postComment,
} = require("../controllers/articles.controllers.js");
const endpoints = require("../../endpoints.json");
const { errorHandling } = require("./error-handling.js");


const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints: endpoints });
});

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentByArticleId);

app.post('/api/articles/:article_id/comments', postComment)
  
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid Path!" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Article not found!" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
