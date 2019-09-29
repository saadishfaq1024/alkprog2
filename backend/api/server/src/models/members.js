module.exports = (sequelize, DataTypes) => {
  const Members = sequelize.define(
    'Members',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      member_full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      member_first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      member_last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      bday: {
        type: DataTypes.STRING,
        allowNull: true
      },
      npi: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: true
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { timestamps: false }
  )
  return Members
}
