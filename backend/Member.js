const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.sequelize.define(
  "member",

  {
    title: {
      type: Sequelize.STRING
    },

    member_first_name: {
      type: Sequelize.STRING
    },
    member_last_name: {
      type: Sequelize.STRING
    },
    member_full_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    street_address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    npi: {
      type: Sequelize.STRING
    },
    pass: {
      type: Sequelize.STRING
    },
    bday: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    admin: {
      type: Sequelize.BOOLEAN
    },
    therapist: {
      type: Sequelize.BOOLEAN
    },
    intern: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);
