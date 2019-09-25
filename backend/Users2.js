//import User2 from "./sequelize";
//import bcrypt from "bcrypt";
const express = require("express");
const bcrypt = require("bcrypt");
const User2 = require("./sequelize");
const users2 = express.Router();
const cors = require("cors");

const BCRYPT_SALT_ROUNDS = 12;

users2.use(cors());

users2.post("/register2", (req, res) => {
  const data = {
    first_name: req.body.newFirstName,
    last_name: req.body.newLastName,
    email: req.body.newEmail,
    org: req.body.newOrg,
    password: req.body.newPass
  };
  User2.findOne({
    where: {
      email: req.body.newEmail
    }
  })
    .then(user => {
      if (user != null) {
        console.log("email already taken");
        res.json("email already taken");
      } else {
        bcrypt
          .hash(data.password, BCRYPT_SALT_ROUNDS)
          .then(function(hashedPassword) {
            User2.create({
              first_name: req.body.newFirstName,
              last_name: req.body.newLastName,
              email: req.body.newEmail,
              org: req.body.newOrg,
              password: hashedPassword
            }).then(() => {
              console.log("user created in db");
              res.status(200).send({ message: "user created" });
            });
          });
      }
    })
    .catch(err => {
      console.log("problem communicating with db");
      res.status(500).json(err);
    });
});

module.exports = users2;
