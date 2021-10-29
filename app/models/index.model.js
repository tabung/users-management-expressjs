const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const uuid = require("uuid").v4();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const checkConnection = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize, uuid);

module.exports = db;
