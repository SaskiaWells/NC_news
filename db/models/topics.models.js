const connection = require("../connection");

exports.retreiveTopics = () => {
    return connection
      .query(
        `SELECT *  FROM topics;`
      )
      .then((result) => {
        return result.rows;
      });
};
