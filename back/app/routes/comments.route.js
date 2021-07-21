const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const comments = require ('../controllers/comment');

//pour enregistrer des commentaires
router.post('/',auth, comments.createComment);

//pour supprimer un commentaire 
router.delete('/:id', auth, comments.deleteComment);


module.exports = router;