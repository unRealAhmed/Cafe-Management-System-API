const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});




module.exports = Category;
