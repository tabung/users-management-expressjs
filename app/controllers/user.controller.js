const db = require("../models/index.model");
const User = db.users;
const Op = require("sequelize").Op;
const uuid = require("uuid").v4;
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(201).send({
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  // body validate
  const {
    user_name,
    user_firstName,
    user_lastName,
    user_email,
    user_password,
  } = req.body;
  if (!(user_name, user_firstName, user_email, user_password)) {
    return res.status(404).send({
      message: "all field mush not empty",
    });
  }
  try {
    const enPass = await bcrypt.hash(user_password, 10);
    const createUser = await User.create({
      user_id: uuid(),
      user_name: user_name,
      user_firstName: user_firstName,
      user_lastName: user_lastName || ".",
      user_email: user_email,
      user_password: enPass,
    });
    res.status(201).send(createUser);
  } catch (error) {
    res.status(501).send({
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findByPk(user_id);
    if (user === null)
      return res
        .status(404)
        .send({ message: `User with id ${user_id} not found` });
    res.send(user);
  } catch (err) {
    res.status(501).send({ message: err.message });
  }
};

exports.updateUserById = async (req, res) => {
  const user_id = req.params.id;
  // validation what's user can edit in this profile
  // for password we will make another modules
  // in here user only can update user_firstName, user_lastName, user_email & user_username
  const { user_firstName, user_lastName, user_email, user_name } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (user === null)
      return res
        .status(400)
        .send({ message: `User with id ${user_id} not found` });

    const userUpdate = await User.update(
      {
        user_name: user_name ? user_name : user.user_name,
        user_firstName: user_firstName ? user_firstName : user.user_firstName,
        user_lastName: user_lastName ? user_lastName : user.user_lastName,
        user_email: user_email ? user_email : user.user_email,
      },
      { where: { user_id: user_id } }
    );
    res.send({ message: `user with id ${user_id} has been update` });
  } catch (err) {
    res.status(501).send({ message: err.message });
  }
};

// delete user by id
exports.delete = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findByPk(user_id);
    if (user === null)
      return res
        .status(400)
        .send({ message: `User with id ${user_id} not found` });
    await User.destroy({
      where: { user_id: user_id },
    });
    res.send({
      message: `User with id ${user_id} has been delete successfully!`,
    });
  } catch (err) {
    res.status(501).send({ message: err.message });
  }
};

// user change password
exports.passwordChange = async (req, res) => {
  // validate for change password
  // user_id, user_passwordOld, user_newPassword
  const { user_id, user_oldPassword, user_newPassword } = req.body;
  if (!(user_id, user_oldPassword, user_newPassword))
    return res.status(401).send({ message: "All field mush not empty" });
  try {
    const user = await User.findByPk(user_id);
    // check user
    if (user === null)
      return res
        .status(400)
        .send({ message: `User with id ${user_id} not found` });

    //check oldPassword
    const passwordCheck = await bcrypt.compare(
      user_oldPassword,
      user.user_password
    );
    if (!passwordCheck)
      return res.status(401).send({ message: "Password incorrect" });

    const newPass = await bcrypt.hash(user_newPassword, 10);
    await User.update(
      { user_password: newPass },
      { where: { user_id: user_id } }
    );
    res.send({ message: "Password has been updated successfully" });
  } catch (err) {}
};
