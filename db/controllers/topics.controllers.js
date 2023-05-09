const { retreiveTopics } = require("../models/topics.models");
const { json } = require("express");





exports.getTopics = (req, res, next) => {
    retreiveTopics()
      .then((data) => {
        res.status(200).send({ topic: data });
      })
      .catch((err) => {
        next(err);
      });
};