const express = require("express");
const model = require("./app/models/index.model");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test router
app.get("/", (req, res) => {
  res.send({ message: "welcome to my practice project" });
});

// load user router
require("./app/routers/users.route")(app);

// sync databases
model.sequelize.sync();
// ini untuk reset database
// model.sequelize.sync({ force: true });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
