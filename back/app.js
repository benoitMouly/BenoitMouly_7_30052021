const express = require('express'); // pour importer application Express
const bodyParser = require('body-parser'); // pour importer le package body parser
const userRoute = require('./app/routes/user.route'); // pour importer notre router user
const postRoute = require('./app/routes/posts.route'); // pour importer notre router user
const commentsRoute = require('./app/routes/comments.route')
const path = require('path'); // pour donner accès au chemin de notre système de fichiers

const app = express();
const cors = require('cors')
const db = require("./app/models");

db.sequelize.sync()

app.use(cors())
app.use(bodyParser.json()); // pour transformer le corps de la requête en objet JS
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoute); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/auth
app.use('/api/posts', postRoute); // pour enregistrer le routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/comments', commentsRoute);

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/


module.exports = app;