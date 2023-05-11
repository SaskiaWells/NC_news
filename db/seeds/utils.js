const connection = require('../connection')

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.createCommentNumber = (articles) => {
  return connection
    .query(`SELECT comments.article_id FROM comments`)
    .then((result) => {
      const commentObj = result.rows
      articles.forEach((article) => {
      article.comment_count = 0
      })
      for (let i = 0; i < articles.length; i++){
        for (let j = 0; j < commentObj.length; j++){
          if (articles[i].article_id === commentObj[j].article_id) {
            articles[i].comment_count += 1
          }
        }
      }

      return articles

      })
  }
  

