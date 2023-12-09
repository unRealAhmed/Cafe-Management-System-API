/* eslint-disable no-unused-vars */
const sequelize = require('./DBConnection')
const User = require('../models/User')
const Category = require('../models/Category')

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

