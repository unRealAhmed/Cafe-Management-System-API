const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');

const Bill = sequelize.define('Bill', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productDetails: {
    type: DataTypes.JSON,
    defaultValue: null,
  },
  createdBy: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}
);

module.exports = Bill;
