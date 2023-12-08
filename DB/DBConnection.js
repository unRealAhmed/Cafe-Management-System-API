require('dotenv').config({ path: '../config.env' })
const { Sequelize } = require('sequelize')
// const mysql = require('mysql2')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(`Database Connected Successfully..👍`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB()

// const connection = mysql.createConnection({
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// })

// connection.connect((err) => {
//   if (!err) {
//     console.log(`Database Connected Successfully..👍`);
//   } else {
//     console.log(err);
//   }
// })

module.exports = sequelize

