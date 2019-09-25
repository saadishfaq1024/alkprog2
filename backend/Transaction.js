const Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.sequelize.define(
  "transaction",

  {
    date: {
      type: Sequelize.DATE
    },

    transType: {
      type: Sequelize.STRING
    },

    payor: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.STRING
    },
    method: {
      type: Sequelize.STRING
    },

    description: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
