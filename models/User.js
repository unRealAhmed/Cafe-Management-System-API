const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../DB/DBConnection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// sequelize.sync({ force: false })

// Helper function to hash the password
const hashPassword = async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  }
};

// Hash password before creating or updating user
User.beforeCreate(async (user, options) => {
  await hashPassword(user, options);
});

User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    await hashPassword(user, options);
  }
});

module.exports = User;
