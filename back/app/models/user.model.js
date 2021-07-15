module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', { 
      id:{ 
          type:Sequelize.INTEGER.UNSIGNED, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 
      username: { 
        type: Sequelize.STRING, 
        allowNull:false,
        unique: true
      }, 
      email: { 
        type: Sequelize.STRING, 
        allowNull:false,
        unique: true
      }, 
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      picture: { 
        type: Sequelize.STRING
      },

      right: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: true,
      },
  }) 
    
      return User;
  };