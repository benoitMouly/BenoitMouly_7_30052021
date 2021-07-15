const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.posts = require("../models/post.model.js")(sequelize, Sequelize);
db.comments = require("../models/comment.model.js")(sequelize, Sequelize);





// l'utilisateur peut avoir plusieurs publications
db.user.hasMany(db.posts, {

  foreignKey:{
  allowNull: false},
  onDelete:`CASCADE`

});

// mais la publication n'appartient qu'à un utilisateur
db.posts.belongsTo(db.user, {

  foreignKey: "userId",
  onDelete:"CASCADE"

});

// La publication peut avoir plusieurs commentaires
db.posts.hasMany(db.comments, {

   onDelete: 'CASCADE'
  
});

// Le commentaire n'appartient qu'à un seul utilisateur
db.comments.belongsTo(db.user, { 
  
  foreignKey: 'AuthorId', 
  onDelete: 'CASCADE' 

});

// Mais il appartient aussi à la publication
db.comments.belongsTo(db.posts, { 
  
  foreignKey: 'IdPost', 
  onDelete: 'CASCADE' 

});

module.exports = db;