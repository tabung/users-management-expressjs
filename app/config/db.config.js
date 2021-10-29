module.exports = {
  DB: "express_user",
  USER: "tabun",
  PASS: "tabun12",
  HOST: "localhost",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
