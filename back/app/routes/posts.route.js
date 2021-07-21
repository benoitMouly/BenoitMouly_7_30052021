const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const post = require('../controllers/posting');

//pour créer un post
router.post('/', auth, multer, post.createPost);

//pour afficher tous les posts
router.get('/',  post.retrieveEveryPosts);

//pour afficher les post d'un user en particulier
router.get('/users/:id', auth, post.retrieveAllByUsers);

//pour supprimer un post
router.delete('/:id', auth, post.deletePost);

//pour afficher tous les commentaires
router.get('/:id/comments', multer, post.getAllComments);

module.exports = router;