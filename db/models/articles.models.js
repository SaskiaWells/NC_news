const connection = require("../connection");
const { createCommentNumber, checkArticleExists } = require("../seeds/utils");

exports.retreiveArticleById = (article_id) => {
  return connection
    .query(` SELECT  *  FROM articles WHERE article_id = $1;`, [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found!" });
      }

      return result.rows;
    });
};

exports.retreiveArticles = () => {
  return connection
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles ORDER BY created_at DESC`
    )
    .then((result) => {
      return createCommentNumber(result.rows);
    });
};

exports.retreiveCommentByArticleId = (article_id) => {
  return checkArticleExists(article_id)
    .then(() => {
      return connection.query(
        `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
        [article_id]
      );
    })
    .then((result) => {
      return result.rows;
    });
};

exports.addComment = (newComment, article_id) => {
  const { body, author, votes, created_at } = newComment;
  const newCommentQuery = `INSERT INTO comments (body, article_id, author, votes, created_at) VALUES ($1, $2, $3, 0, now()) RETURNING *;`;

  return connection.query(newCommentQuery, [
    body,
    article_id,
    author,
  ]).then(result => {
    return result.rows[0]                                   
  });
};

exports.updateArticleVotes = (articleId, articleBody) => {
  if (!Object.keys(articleBody).length) {
    return Promise.reject({ status: 400, msg: "Missing request body!" });
  }

  
  const { inc_votes } = articleBody;
  const queryString = `UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *;`;

  const queryArr = [inc_votes, articleId];

  const checkArticle = checkArticleExists(articleId);
  const queryPromise = connection.query(queryString, queryArr);
  return Promise.all([checkArticle, queryPromise]).then(
    ([_, result]) => result.rows[0]
  );
};
