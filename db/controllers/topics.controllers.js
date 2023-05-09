const { retreiveTopics } = require("../models/topics.models");




exports.getTopics = (req, res, next) => {
    retreiveTopics()
      .then((data) => {
        res.status(200).send({ topic: data });
      })
      .catch((err) => {
        next(err);
      });
};