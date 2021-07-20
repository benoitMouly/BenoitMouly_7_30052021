const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const comments = require ('../controllers/comment');
const post = require('../controllers/posting');

//pour enregistrer des commentaires
router.post('/',auth, comments.createComment);

//pour supprimer un commentaire 
router.delete('/:id', auth, comments.deleteComment);

//pour afficher tous les commentaires
router.get('/:id/comments', multer, post.getAllComments);


module.exports = router;