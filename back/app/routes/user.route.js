const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config'); // pour importer le middleware multer
const auth = require('../middleware/auth'); // pour importer le middleware auth
const userController = require('../controllers/user'); // pour importer les controleurs
const authController = require('../controllers/auth.js'); // pour importer les controleurs authentification


//pour créer un nouveau user 
router.post('/auth/signup', multer, authController.register);

//pour connecter le user 
router.post('/auth/login', authController.login);

//pour récupérer tous les users
router.get('/users', auth, userController.getAllUsers);

//pour récupérer un seul user
router.get('/users/user/:id', auth, userController.getUniqueUser);

//pour récupérer le user qui est connecté
router.get('/users/current',  auth, multer, userController.getCurrentUser);

//pour supprimer le compte du user connecté
router.delete('/users/current', auth, userController.deleteCurrentUser);

module.exports = router;