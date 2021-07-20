module.exports = (sequelize, Sequelize) => {
    const moment = require('moment');
    const Comment = sequelize.define("comment", { 
      id:{ 
          type:Sequelize.INTEGER, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 

      content: { 
        type: Sequelize.TEXT, 
        allowNull:false
      }, 

       createdAt: {
            type : Sequelize.DATE,

            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY à hh:mm:ss a');
            }
        }
    });
      return Comment;
  };