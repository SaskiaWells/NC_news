const { retreiveArticleById, retreiveArticles } = require("../models/articles.models")

exports.getArticleById = (req, res, next) => {

    const { article_id } = req.params
    
    retreiveArticleById(article_id).then((article) => {
        res.status(200).send({article: article[0]})
    })
        .catch(err => {
        next(err)
    })
}

exports.getArticles = (req, res, next) => {

    retreiveArticles().then((articles) => {
        res.status(200).send({articles: articles})
    })

} 