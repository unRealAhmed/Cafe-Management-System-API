const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appErrors');
const createToken = require('../util/createToken');
// const { hashPassword } = require('../util/passwordHash');
const User = require('../models/User');
// Helper function to send JWT token as a response
const sendTokenResponse = (res, user, statusCode) => {
  // Create a JWT token 
  const token = createToken(res, user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// Signup Controller
exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(new AppError('Name, email, and password are required.', 400));
  }
  const newUser = await User.create({
    name,
    email,
    password,
    role: 'user',
  });

  // Send token response
  sendTokenResponse(res, newUser, 201);

});

