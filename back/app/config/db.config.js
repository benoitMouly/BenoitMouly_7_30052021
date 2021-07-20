module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "lD1905@76", // add your own password or leave empty between strings if you don't have any
    DB: "groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  