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
  passwordChangedAt: {
    type: DataTypes.DATE,
  },
  passwordResetToken: {
    type: DataTypes.STRING,
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// sequelize.sync({ force: false })

// Method to compare passwords
User.prototype.passwordMatching = async function (enteredPassword, userPassword) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

// Method to check if the password has changed after the token was issued
User.prototype.changedPasswordAfter = function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    // Convert passwordChangedAt timestamp to seconds
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return tokenIssuedAt < changedTimestamp;
  }
  return false;
};

// Helper function to hash the password
const hashPassword = async (user) => {
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
