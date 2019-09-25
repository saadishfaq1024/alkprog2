const Sequelize = require("sequelize");
const UserModel = require("./user2");

const sequelize = new Sequelize("dev2qa", "root", "Artm@y08", {
  host: "localhost",
  dialect: "mysql"
});

const User2 = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

module.exports = User2;
