//const express = require("express");
const express = require("express");
const registerClients = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("./Client");
registerClients.use(cors());

process.env.SECRET_KEY = "secret";

registerClients.post("/registerclient", (req, res) => {
  Client.create({
    client_type: req.body.clientType,
    title: req.body.clientTitle,
    client_first_name: req.body.clientFirstName,
    client_last_name: req.body.clientLastName,
    client_full_name: req.body.clientFirstName + " " + req.body.clientLastName,
    // need to still add part for therapist first and last name
    email: req.body.clientEmail,
    password: req.body.clientCurrentPassword,
    phone: req.body.clientPhone,
    street_address: req.body.clientAddress,
    //primary_location: req.body.primaryLocation,
    bday: req.body.clientBday,
    city: req.body.clientCity,
    state: req.body.clientState,
    zip: req.body.clientZipCode,
    notes: req.body.clientNotes,
    // contact info
    contact_title: req.body.contactTitle,
    contact_first_name: req.body.contactFirstName,
    contact_last_name: req.body.contactLastName,
    contact_street_address: req.body.contactAddress,
    contact_city: req.body.contactCity,
    contact_state: req.body.contactState,
    contact_zip: req.body.contactZip,
    contact_email: req.body.contactEmail,
    contact_phone: req.body.contactPhone,
    // contact 2 info
    contact_title_2: req.body.contactTitle,
    contact_first_name_2: req.body.contactFirstName2,
    contact_last_name_2: req.body.contactLastName2,
    contact_street_address_2: req.body.contactAddress2,
    contact_city_2: req.body.contactCity2,
    contact_state_2: req.body.contactState2,
    contact_zip_2: req.body.contactZip2,
    contact_email_2: req.body.contactEmail2,
    contact_phone_2: req.body.contactPhone2,
    // contact 3 info
    contact_title_3: req.body.contactTitle3,
    contact_first_name_3: req.body.contactFirstName3,
    contact_last_name_3: req.body.contactLastName3,
    contact_street_address_3: req.body.contactAddress3,
    contact_city_3: req.body.contactCity3,
    contact_state_3: req.body.contactState3,
    contact_zip_3: req.body.contactZip3,
    contact_email_3: req.body.contactEmail3,
    contact_phone_3: req.body.contactPhone3,
    // payor info
    billing_first_name: req.body.billingFirstName,
    billing_last_name: req.body.billingLastName,
    payment_type: req.body.paymentType,
    card_type: req.body.cardType,
    card_num: req.body.cardNum,
    card_exp_date: req.body.expDate,
    cvv: req.body.cvv,
    billing_street_address: req.body.billingAddress,
    name_on_card: req.body.nameOnCard,
    billing_city: req.body.billingCity,
    billing_state: req.body.billingState,
    billing_phone: req.body.billingPhone,
    billing_zip: req.body.billingZip
  })
    .then(Client => {
      res.json("Client info updated");
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

//REGISTER
{
  /*
registerClients.post("/registerclient", (req, res) => {
  const newClientData = {
    client_type: req.body.clientType,
    title: req.body.clientTitle,
    client_first_name: req.body.clientFirstName,
    client_last_name: req.body.clientLastName,
    client_full_name: req.body.clientFirstName + " " + req.body.clientLastName,
    // need to still add part for therapist first and last name
    email: req.body.clientEmail,
    password: req.body.clientCurrentPassword,
    phone: req.body.clientPhone,
    street_address: req.body.clientAddress,
    //primary_location: req.body.primaryLocation,
    bday: req.body.clientBday,
    city: req.body.clientCity,
    state: req.body.clientState,
    zip: req.body.clientZipCode,
    notes: req.body.clientNotes,
    // contact info
    contact_title: req.body.contactTitle,
    contact_first_name: req.body.contactFirstName,
    contact_last_name: req.body.contactLastName,
    contact_street_address: req.body.contactAddress,
    contact_city: req.body.contactCity,
    contact_state: req.body.contactState,
    contact_zip: req.body.contactZip,
    contact_email: req.body.contactEmail,
    contact_phone: req.body.contactPhone,
    // contact 2 info
    contact_title_2: req.body.contactTitle,
    contact_first_name_2: req.body.contactFirstName2,
    contact_last_name_2: req.body.contactLastName2,
    contact_street_address_2: req.body.contactAddress2,
    contact_city_2: req.body.contactCity2,
    contact_state_2: req.body.contactState2,
    contact_zip_2: req.body.contactZip2,
    contact_email_2: req.body.contactEmail2,
    contact_phone_2: req.body.contactPhone2,
    // contact 3 info
    contact_title_3: req.body.contactTitle3,
    contact_first_name_3: req.body.contactFirstName3,
    contact_last_name_3: req.body.contactLastName3,
    contact_street_address_3: req.body.contactAddress3,
    contact_city_3: req.body.contactCity3,
    contact_state_3: req.body.contactState3,
    contact_zip_3: req.body.contactZip3,
    contact_email_3: req.body.contactEmail3,
    contact_phone_3: req.body.contactPhone3,
    // payor info
    billing_first_name: req.body.billingFirstName,
    billing_last_name: req.body.billingLastName,
    payment_type: req.body.paymentType,
    card_type: req.body.cardType,
    card_num: req.body.cardNum,
    card_exp_date: req.body.expDate,
    cvv: req.body.cvv,
    billing_street_address: req.body.billingAddress,
    name_on_card: req.body.nameOnCard,
    billing_city: req.body.billingCity,
    billing_state: req.body.billingState,
    billing_phone: req.body.billingPhone,
    billing_zip: req.body.billingZip
  };
  Client.findOne({
    where: {
      email: req.body.clientEmail
    }
  })

    .then(client => {
      if (!client) {
        const hash = bcrypt.hashSync(newClientData.password, 10);
        newClientData.password = hash;
        Client.create(newClientData)
          .then(() => {
            res.json("client created ");
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "Client's email already exsis" });
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});
*/
}
module.exports = registerClients;

/*
  Client.findOrCreate({ where: { email: req.body.clientEmail } });
  Client.create(newClientData).then(client => {
    res.json("client created " + client);
  });
});

module.exports = registerClients; */

/*
});

module.exports = registerClients;
/* 

//const express = require("express");
const express = require("express");
const registerClients = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Client = require("./Client");
registerClients.use(cors());

process.env.SECRET_KEY = "secret";

//REGISTER

registerClients.post("/registerclient", (req, res) => {
  const newClientData = {
    title: req.body.title,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.clientEmail,
    password: req.body.currentPassword,
    phone: req.body.phone,
    street_address: req.body.address,
    primary_location: req.body.primaryLocation,
    bday: req.body.bday,
    city: req.body.city,
    state: req.body.clientState,
    zip: req.body.zipCode,
    notes: req.body.notes,
    //therapist_first:
    //therapist_last:
    //facility:
    //session_type:
    // session_cost:
    //session_length:
    //primary_location:
    contact_title: req.body.contactTitle,
    contact_first: req.body.contactFirstName,
    contact_last: req.body.contactLastName,
    contact_street_address: req.body.contactAddress,
    contact_city: req.body.contactCity,
    contact_state: req.body.contactState,
    contact_zip: req.body.contactZip,
    contact_email: req.body.contactEmail,
    contact_phone: req.body.contactPhone,
    payment_type: req.body.paymentType,
    card_type: req.body.cardType,
    card_num: req.body.cardNum,
    card_exp_date: req.body.expDate,
    cvv: req.body.cvv,
    billing_street_address: req.body.billingAddress,
    name_on_card: req.body.nameOnCard,
    billing_city: req.body.billingCity,
    billing_state: req.body.billingState,
    billing_phone: req.body.billingPhone,
    billing_zip: req.body.billingZip
  };

  Client.findOne({
    where: {
      email: req.body.clientEmail
    }
  })


  
    .then(client => {
      if (!client) {
        const hash = bcrypt.hashSync(newClientData.password, 10);
        newClientData.password = hash;
        Client.create(newClientData)
          .then(client => {
            res.json("client created " + client);
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "Client's email already exsis" });
      }
    })
    .catch(err => {
      res.send("error" + err);
    });
});

module.exports = registerClients;
 */
