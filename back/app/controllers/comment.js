const db = require('../models');
const comment = require('../models/comment.model.js');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config")

exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    const userId = decodedToken.userId;

    db.posts.findOne({ where: { idPost: req.body.itemId}})
        .then(post => {
            db.comments.create({
                content: req.body.content,
                IdPost: req.body.itemId,
                AuthorId: userId
            })

            .then(comment => res.status(201).json({ comment }))
            .catch(error => res.status(400).json({ error: error.message }))
        })
        .catch(error => res.status(400).json({ error: error.message }))
}

exports.deleteComment = (req, res, next) => {
    db.comments.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé'}))
        .catch(error => res.status(400).json({ error: error.message }));
};