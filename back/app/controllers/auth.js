const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");
const db = require('../models');
const User = db.user;
const passWordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const maskData = require('maskdata')


const emailMaskOptions = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
  };

exports.register = (req, res, next) => {
    
     if (!passWordReg.test(req.body.password)){ 
        res.status(406).json('Mot de passe incorrect ! Votre mot de passe doit contenir 8 caractères minimum avec : majuscules/minuscules, chiffres, caractères spéciaux.')  
        return false
     }

     if (!req.file) {
        return res.status(400).send("Veuillez vérifier l'extension de votre fichier.");
    }

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create ({
            email: maskData.maskEmail2(req.body.email, emailMaskOptions),
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
        .catch(error => res.status(400).json("Pseudo ou email invalide." ));
    })
    .catch(error => res.status(500).json({ message: error.message })) 
};

exports.login = (req, res, next) => {
    User.findOne({where: { username: req.body.username } }) // Si ce pseudo existe bien
        .then(user => {
            if (!user) {
                return res.status(401).json("Utilisateur non trouvé.");
            }
            bcrypt.compare(req.body.password, user.password) // bcrypt.compare pour comparer avec la bdd
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json("Mot de passe incorrect");
                    }
                    res.status(200).json({
                        token: jwt.sign( 
                            {
                                userId: user.id,
                                right: user.right,
                                userName: user.username
                            },
                            config.secret, 
                            {expiresIn: '24h'} // durée de validité du token
                        )
                    });
                })
                .catch(error => res.status(500).json({ message : error.message }));
        })
        .catch(error => res.status(500).json({ message : error.message }));
};