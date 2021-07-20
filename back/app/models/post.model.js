module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');
    const Post = sequelize.define("post", {
      idPost:{
        autoIncrement: true,
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey : true
      },
      title: {
        type: Sequelize.STRING
      },

      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
                         
      get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY à hh:mm:ss a');
        }
    },
  },
    );
  
    return Post;
  };