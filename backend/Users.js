//const express = require("express");
const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./User");
users.use(cors());

process.env.SECRET_KEY = "secret";

//REGISTER

users.post("/register", (req, res) => {
  const userData = {
    first_name: req.body.newFirstName,
    last_name: req.body.newLastName,
    email: req.body.newEmail,
    org: req.body.newOrg,
    password: req.body.newPass
  };

  User.findOne({
    where: {
      email: req.body.newEmail
    }
  })
    .then(user => {
      if (!user) {
        const hash = bcrypt.hashSync(userData.password, 10);
        userData.password = hash;
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            });
            res.json({ token: token });
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "User already exsis" });
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});

module.exports = users;
