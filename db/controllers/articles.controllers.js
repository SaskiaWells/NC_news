const { retreiveArticle } = require("../models/articles.models")

exports.getArticle = (req, res, next) => {

    const { article_id } = req.params
    
    retreiveArticle(article_id).then((article) => {
        res.status(200).send({article: article[0]})
    })
        .catch(err => {
        next(err)
    })
}