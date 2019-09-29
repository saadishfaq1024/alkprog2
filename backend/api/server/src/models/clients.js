module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define(
    'Clients',
    {
      id: {
        type: DataTypes.STRING,
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
      client_full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      client_first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      client_last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      client_initials: {
        type: DataTypes.STRING,
        allowNull: true
      },
      client_type: {
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
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      assi_therapist_full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      assi_therapist_first: {
        type: DataTypes.STRING,
        allowNull: true
      },
      assi_therapist_last: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facility: {
        type: DataTypes.STRING,
        allowNull: true
      },
      session_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      session_cost: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      session_length: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      bday: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true
      },
      primary_location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_street_address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_zip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_first_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_last_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_full_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      payment_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      card_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      card_num: {
        type: DataTypes.STRING,
        allowNull: true
      },
      card_exp_date: {
        type: DataTypes.STRING,
        allowNull: true
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_street_address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name_on_card: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      billing_zip: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_title_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_first_name_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_last_name_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_street_address_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_city_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_state_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_zip_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_email_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_phone_2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_title_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_first_name_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_last_name_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_street_address_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_city_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_state_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_zip_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_email_3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_phone_3: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { timestamps: false }
  )
  return Clients
}
