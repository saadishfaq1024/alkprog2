//const express = require("express");
const express = require("express");
const getTherapists = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Member = require("./Member");
getTherapists.use(cors());

process.env.SECRET_KEY = "secret";

getTherapists.get("/gettherapists", () => {
  Member.findAll({
    where: {
      role: "Therapist",
      active: 1
    }
  });
});

getTherapists.get("/gettherapists2", res => {
  Member.findAll({
    where: {
      role: "Therapist",
      active: 1
    }
  }).then(therapist => {
    res.json(therapist);
  });
});

getTherapists.get("/gettherapists3", (req, res) => {
  Member.findAll({
    where: {
      role: "Therapist",
      active: 1
    }
  }).catch(err => {
    res.send("error" + err);
  });
});

module.exports = getTherapists;
