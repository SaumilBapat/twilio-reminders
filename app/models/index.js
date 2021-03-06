var env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/db.config.js")[env];

const Sequelize = require("sequelize");
var sequelize;

if (dbConfig.use_env_variable) {
  console.log('~~~Using Env Vars - process.env.DATABASE_URL: ' + process.env.DATABASE_URL);
  sequelize = new Sequelize(process.env.DATABASE_URL, {
      operatorsAliases: "false",
      dialect: 'mysql',
      protocol: 'mysql'
    });
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.goals = require("./app.model.js")(sequelize, Sequelize);

module.exports = db;