const express = require('express'); // pour importer application Express
const bodyParser = require('body-parser'); // pour importer le package body parser
const userRoute = require('./app/routes/user.route'); // pour importer notre router user
const postRoute = require('./app/routes/posts.route'); // pour importer notre router user
const commentsRoute = require('./app/routes/comments.route')
const path = require('path'); // pour donner accès au chemin de notre système de fichiers
// Security
const helmet = require('helmet');
const tooBusy = require('toobusy-js'); // Avoiding DoS when under heavy network traffic
const hpp = require('hpp'); // Avoiding multiple http parameters which can cause unpredictable interpretations
const getRawBody = require('raw-body'); // Avoiding heavy requests than can exhaust server memory and / or fill disk space



const app = express();
const cors = require('cors')
const db = require("./app/models");

db.sequelize.sync()

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Avoiding heavy requests than can exhaust server memory and / or fill disk space
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use(express.json({ limit: "40kb" }));

// Avoiding DoS when under heavy network traffic
app.use(function(req, res, next) {
  if (tooBusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

// Avoiding multiple http parameters which can cause unpredictable interpretations
app.use(hpp())




app.use(cors())
app.use(bodyParser.json()); 
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api', userRoute); 
app.use('/api/posts', postRoute); 
app.use('/api/comments', commentsRoute);

// RESET YOUR DB

/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/


module.exports = app;