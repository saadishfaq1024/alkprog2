const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.sequelize.define(
  "client",

  {
    title: {
      type: Sequelize.STRING
    },

    client_type: {
      type: Sequelize.STRING
    },

    client_first_name: {
      type: Sequelize.STRING
    },
    client_last_name: {
      type: Sequelize.STRING
    },
    client_full_name: {
      type: Sequelize.STRING
    },
    bday: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    street_address: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    assi_therapist_first: {
      type: Sequelize.STRING
    },
    assi_therapist_last: {
      type: Sequelize.STRING
    },
    facility: {
      type: Sequelize.STRING
    },
    session_type: {
      type: Sequelize.STRING
    },
    session_cost: {
      type: Sequelize.DOUBLE
    },
    session_length: {
      type: Sequelize.INTEGER
    },
    primary_location: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    },
    contact_title: {
      type: Sequelize.STRING
    },
    contact_first_name: {
      type: Sequelize.STRING
    },
    contact_last_name: {
      type: Sequelize.STRING
    },
    contact_street_address: {
      type: Sequelize.STRING
    },
    contact_city: {
      type: Sequelize.STRING
    },
    contact_state: {
      type: Sequelize.STRING
    },
    contact_zip: {
      type: Sequelize.STRING
    },
    contact_email: {
      type: Sequelize.STRING
    },
    contact_phone: {
      type: Sequelize.STRING
    },
    contact_title_2: {
      type: Sequelize.STRING
    },
    contact_first_name_2: {
      type: Sequelize.STRING
    },
    contact_last_name_2: {
      type: Sequelize.STRING
    },
    contact_street_address_2: {
      type: Sequelize.STRING
    },
    contact_city_2: {
      type: Sequelize.STRING
    },
    contact_state_2: {
      type: Sequelize.STRING
    },
    contact_zip_2: {
      type: Sequelize.STRING
    },
    contact_email_2: {
      type: Sequelize.STRING
    },
    contact_phone_2: {
      type: Sequelize.STRING
    },
    contact_title_3: {
      type: Sequelize.STRING
    },
    contact_first_name_3: {
      type: Sequelize.STRING
    },
    contact_last_name_3: {
      type: Sequelize.STRING
    },
    contact_street_address_3: {
      type: Sequelize.STRING
    },
    contact_city_3: {
      type: Sequelize.STRING
    },
    contact_state_3: {
      type: Sequelize.STRING
    },
    contact_zip_3: {
      type: Sequelize.STRING
    },
    contact_email_3: {
      type: Sequelize.STRING
    },
    contact_phone_3: {
      type: Sequelize.STRING
    },
    billing_first_name: {
      type: Sequelize.STRING
    },
    billing_last_name: {
      type: Sequelize.STRING
    },
    payment_type: {
      type: Sequelize.STRING
    },
    card_type: {
      type: Sequelize.STRING
    },
    card_num: {
      type: Sequelize.STRING
    },
    card_exp_date: {
      type: Sequelize.STRING
    },
    cvv: {
      type: Sequelize.STRING
    },
    billing_street_address: {
      type: Sequelize.STRING
    },
    name_on_card: {
      type: Sequelize.STRING
    },
    billing_city: {
      type: Sequelize.STRING
    },
    billing_state: {
      type: Sequelize.STRING
    },
    billing_phone: {
      type: Sequelize.STRING
    },
    billing_zip: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
