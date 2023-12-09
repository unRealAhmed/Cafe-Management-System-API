const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DBConnection');
const Category = require('./Category');

const Product = sequelize.define('Product', {
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
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING(255),
  },
  price: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING(20),
  },
}, {
  timestamps: false,
});


Product.belongsTo(Category, { foreignKey: 'categoryID' });

module.exports = Product;
