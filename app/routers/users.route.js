module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../controllers/user.controller");
  // get all users
  router.get("/", userController.getAllUser);
  router.post("/", userController.create);
  router.get("/:id", userController.getUserById);
  router.put("/:id", userController.updateUserById);
  router.delete("/:id", userController.delete);

  // change password
  router.post("/update", userController.passwordChange);

  app.use("/users", router);
};
