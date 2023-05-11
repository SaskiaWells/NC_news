const express = require("express");

const app = express();


exports.errorHandling = () => {

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


}