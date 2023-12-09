/* eslint-disable no-unused-vars */
const sequelize = require('./DBConnection')
const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Bill = require('../models/Bill')



sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

