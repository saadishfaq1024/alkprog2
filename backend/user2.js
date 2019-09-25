module.exports = (sequelize, type) => {
  return sequelize.define(
    "user",
    {
      first_name: {
        type: type.STRING
      },
      last_name: {
        type: type.STRING
      },
      email: {
        type: type.STRING
      },
      org: {
        type: type.STRING
      },
      password: {
        type: type.STRING
      }
    },
    {
      timestamps: false
    }
  );
};
