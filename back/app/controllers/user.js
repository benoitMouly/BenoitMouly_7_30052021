const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const config = require("../config/auth.config");

// Utilisateur actuel dans sa session

exports.getCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    const userId = decodedToken.userId;

    db.user.findOne({ where: { id: userId } })
        .then(user => {
            res.status(200).json({
                userId: userId,
                username: user.username,
                userRight: user.right,
                image: user.picture,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: error.message }))
}

// Obtenir tous les utilisateurs

exports.getAllUsers = (req, res, next) => {
    db.user.findAll({
        order: [
            ['username']
      ],
    })
        .then(users => res.status(200).json(users))
        .catch(error => res.status(500).json({ error : error.message}))
}

// Obtenir un utilisateur en particulier 

exports.getUniqueUser = (req, res, next) => {
    db.user.findOne({ where: { id: req.params.id } })
        .then(user => {
            res.status(200).json({
                userId: user.id,
                username: user.username,
                userRight: user.right,
                image: user.picture,
                email: user.email
            });
        })
        .catch(error => res.status(500).json({ error: error.message }))
}

// On s'auto supprime et supprime les autres c'est génial 

exports.deleteCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    const userId = decodedToken.userId;

    db.user.findOne({ where: { id: userId } })
      .then(user => {
        if(user.picture) {
            const filename = user.picture.split('/images/')[1];
            console.log(user.picture)
            fs.unlink(`images/${filename}`, () => {
                user.destroy({ where: { id: userId } })
                .then(() => res.status(200).json({ message: 'Compte supprimé'}))
                .catch(error => res.status(400).json({ error: error.message }));
            });
        }
       user.destroy({ where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Compte supprimé'}))
        .catch(error => res.status(400).json({ error: error.message }));
      })
      .catch(error => res.status(500).json({ error: error.message }));
};