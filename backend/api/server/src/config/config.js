require('dotenv').config();


module.exports = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: 'dev2qa',
    username: 'root',
    password: '1024',
    host: '127.0.0.1',
    dialect: 'mysql'
  },

  test: {
    database: 'dev2qa_test',
    username: 'root',
    password: '1024',
    host: '127.0.0.1',
    dialect: 'mysql'
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};