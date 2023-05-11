const connection = require('../connection')
const { createCommentNumber } = require('../seeds/utils')

exports.retreiveArticleById = (article_id) => {

    return connection
      .query(` SELECT  *  FROM articles WHERE article_id = $1;`, [article_id])
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({status: 404, msg: 'Not found!'})
        }
        return result.rows;
      });
}

exports.retreiveArticles = () => {
  return connection
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url FROM articles ORDER BY created_at DESC`
    )
    .then((result) => {
      //console.log(result.rows)
      return createCommentNumber(result.rows);

    });
}