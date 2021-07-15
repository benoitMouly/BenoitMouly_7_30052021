const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
const db = require('../models');
const User = db.user;
//const passWordReg = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ // on utilise un regex pour le mot de passe
const passWordReg = /^[a-zA-Z ,.'-]+$/;

exports.register = (req, res, next) => {
    
     if (!passWordReg.test(req.body.password)){ 
        res.status(406).json({ message: 'Mot de passe incorrect ! ' })  
        return false
     }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create ({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            picture: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : "",

        })
        
        .then(user => {
            res.status(201).json({
                userId: user.id,
                username: user.username,
                email: user.email,
                image: user.picture,
                token: jwt.sign(
                    { 
                        userId: user.id,
                        email: user.email,
                        userName: user.username,
                    },
                    config.secret,
                    { expiresIn: '24h' }
                )
            })
       })
        .catch(error => res.status(400).json({ message: error.message }));
    })
    .catch(error => res.status(500).json({ message: error.message })) 
};

exports.login = (req, res, next) => {
    User.findOne({where: { username: req.body.username } }) // on vérifie que le pseudo entré par l'utilisateur correspond à un utilisateur existant de la base de données 
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: error.message});
            }
            bcrypt.compare(req.body.password, user.password) // on utilise la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: error.message });
                    }
                    res.status(200).json({
                        //role: user.role,
                        token: jwt.sign( // on utilise la fonction sign dejsonwebtoken pour encoder un nouveau token
                            {
                                userId: user.id,
                                right: user.right,
                                userName: user.username
                            },
                            config.secret, // on utilise une chaîne secrète de développement temporaire
                            {expiresIn: '24h'} // pour définir la durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ message : error.message }));
        })
        .catch(error => res.status(500).json({ message : error.message }));
};