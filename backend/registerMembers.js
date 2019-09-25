//const express = require("express");
const express = require("express");
const registerMembers = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Member = require("./Member");
registerMembers.use(cors());

process.env.SECRET_KEY = "secret";

registerMembers.post("/registermember", (req, res) => {
  Member.create({
    title: req.body.memberTitle,
    member_first_name: req.body.memberFirstName,
    member_last_name: req.body.memberLastName,
    member_full_name: req.body.memberFirstName + " " + req.body.memberLastName,
    phone: req.body.memberPhone,
    street_address: req.body.memberAddress,
    city: req.body.memberCity,
    role: req.body.memberRole,
    zip: req.body.memberZipCode,
    location: req.body.memberLocation,
    npi: req.body.memberNpi,
    email: req.body.memberEmail,
    bday: req.body.memberBday,
    pass: req.body.memberCurrentPass,
    notes: req.body.memberNotes,
    active: req.body.checkedActive
  })
    .then(Member => {
      res.json("Member info updated");
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

//REGISTER
/*
registerMembers.post("/registermember", (req, res) => {
  const newMemberData = {
    title: req.body.memberTitle,
    member_first_name: req.body.memberFirstName,
    member_last_name: req.body.memberLastName,
    member_full_name: req.body.memberFirstName + " " + req.body.memberLastName,
    phone: req.body.memberPhone,
    street_address: req.body.memberAddress,
    city: req.body.memberCity,
    role: req.body.memberRole,
    zip: req.body.memberZipCode,
    location: req.body.memberLocation,
    npi: req.body.memberNpi,
    email: req.body.memberEmail,
    bday: req.body.memberBday,
    pass: req.body.memberCurrentPass,
    notes: req.body.memberNotes,
    active: req.body.checkedActive,
    // admin: req.body.checkedAdmin,
    // therapist: req.body.checkedThera,
    //intern: req.body.checkedIntern
  };

  Member.findOne({
    where: {
      email: req.body.memberEmail
    }
  })
    .then(member => {
      if (!member) {
        const hash = bcrypt.hashSync(newMemberData.pass, 10);
        newMemberData.pass = hash;
        Member.create(newMemberData)
          .then(member => {
            let token = jwt.sign(member.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            });
            res.json("user and token created" + token);
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "Member's email already exsis" });
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});
*/

module.exports = registerMembers;
