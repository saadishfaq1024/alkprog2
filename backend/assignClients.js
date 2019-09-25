//const express = require("express");
const express = require("express");
const assignClients = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("./Client");
assignClients.use(cors());

process.env.SECRET_KEY = "secret";

assignClients.post("/assignclient1", (req, res) => {
  Client.update(
    {
      therapist_first: req.body.firstName,
      therapist_last: req.body.lastName,
      session_type: req.body.sessionType,
      session_cost: req.body.sessionCost,
      session_length: req.body.sessionLength
    },
    { where: { last_name: req.body.client } }
  )
    .then(Client => {
      res.json("client info updated");
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

/*

assignClients.post("/assignclient1", (req, res) => {
  Client.update(
    {
      session_type: req.body.sessionType,
      session_cost: req.body.sessionCost,
      session_length: req.body.sessionLength
    }, //what going to be updated
    { where: { first_name: "jaren" } } // where clause
  )
    .then(assignClientData => {
      res.json("data was Updated");
    })
    .catch(err => {
      res.json("Error : ", err);
    });
  /*
  const id = req.params.id;
            const name = req.body.name;
            const lastname = req.body.lastname;
            const tele = req.body.tele;
            const price = req.body.price;
    StudentWork.update(
        {
            name        : name,
            lastname    : lastname,
            tele        : tele,
            price       : price
        },
        {returning: true, where: {id: id} }
      )
            .then((result)=>{
                res.json("data was Updated");
              
            })
    .catch((err)=>{
        res.send("Error : ",err)
    });


});
*/
module.exports = assignClients;
