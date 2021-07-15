const db = require('../models/index.js');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const fs = require('fs');



exports.createPost = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, config.secret);
    const userId = decodedToken.userId; 
    
    db.user.findOne({ where: { id: userId } }) 
        .then(user => {
            db.posts.create({
                userId: userId,
                title : req.body.title,
                image: req.file
                ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
                : ""
            })
            .catch(error => res.status(500).json({ error: error.message}))
            .then(posts => res.status(201).json({ posts }))
            .catch(error => res.status(400).json({ error: error.message }))
        })
        .catch(error => res.status(500).json({ error: error.message}));        
};


exports.deletePost = (req, res, next) => {
    db.posts.findOne({ where: { idPost: req.params.id } })
        .then(post => {
            if(post.image) {
                const filename = post.image.split('/images/')[1]; // on récupère le nom du fichier à supprimer
                fs.unlink(`images/${filename}`, () => { // on utilise la fonction unlink du package fs pour supprimer le fichier 
                    post.destroy({ where: { idPost: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Post supprimé'}))
                    .catch(error => res.status(400).json({ error: error.message}));
                });
            }
            db.posts.destroy({ where: { idPost: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post supprimé'}))
            .catch(error => res.status(400).json({ error: error.message }));
        })
        .catch(error => res.status(500).json({ error: error.message }));
};

exports.retrieveEveryPosts = (req, res, next) => {
    db.posts.findAll({
        include: {
            model: db.user,
            attributes: ["id", "username"]
        },
        order: [
            ['createdAt']
      ],
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error : error.message }))
}

exports.retrieveAllByUsers = (req, res, next) => {
    db.posts.findAll({
        where: { userId: req.params.id},
        include: {
            model: db.user,
            attributes: ["id", "username", "picture"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.getAllComments = (req, res, next) => {
    db.comments.findAll({
        where: { idPost: req.params.id},
        include: {
            model: db.user,
            attributes: ["id", "username", "picture"]
        },
        order: [
            ['createdAt', 'DESC']
      ],
    }) 
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error: error.message }))
}