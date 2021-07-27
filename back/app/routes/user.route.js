const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const auth = require('../middleware/auth'); // pour importer le middleware auth
const userController = require('../controllers/user'); // pour importer les controleurs
const authController = require('../controllers/auth.js'); // pour importer les controleurs authentification


//Création d'un user
router.post('/auth/signup', multer, authController.register);

//Connection de l'utilisateur
router.post('/auth/login', authController.login);

//Récupération de tous les users
router.get('/users', auth, userController.getAllUsers);

//Récupération d'un seul user
router.get('/users/user/:id', auth, userController.getUniqueUser);

//Récupération du user connecté
router.get('/users/current',  auth, multer, userController.getCurrentUser);

///Suppression de l'user actuel
router.delete('/users/current', auth, userController.deleteCurrentUser);

//Modification image
router.put('/users/myprofil', auth, multer, userController.modifyUser);

//Suppression par l'administrateur
router.delete('/users/user/:id', auth, userController.deleteUserAdmin);

module.exports = router;