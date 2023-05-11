const { retreiveArticleById, retreiveArticles, retreiveCommentByArticleId, addComment } = require("../models/articles.models")

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
        .catch(err => {
        next(err)
    })

} 

exports.getCommentByArticleId = (req, res, next) => {

    const { article_id } = req.params
    
    retreiveCommentByArticleId(article_id).then((comments) => {
        res.status(200).send({comments: comments})
    })
        .catch(err => {
        next(err)
    })
}

exports.postComment = (req, res, next) => {

    const newComment = req.body

    const {article_id} = req.params

    addComment(newComment, article_id).then(result => {
        res.status(201).send({comment: result})
    })
        .catch(err => {
        next(err)
    })
}