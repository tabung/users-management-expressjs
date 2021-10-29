module.exports = (sequelize, Sequelize, uuid) => {
  const user = sequelize.define("users", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "User Name not available",
      },
    },
    user_firstName: {
      type: Sequelize.STRING,
    },
    user_lastName: {
      type: Sequelize.STRING,
    },
    user_email: {
      type: Sequelize.STRING,
      unique: {
        msg: "E-mail already registered ",
      },
      validate: {
        isEmail: {
          msg: "Email format not right",
        },
      },
    },
    user_password: {
      type: Sequelize.STRING,
    },
  });

  return user;
};
