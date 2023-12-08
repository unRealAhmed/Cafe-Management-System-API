require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('./DB/DBConnection')
const errorController = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes')

const app = express()

app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET_KEY));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//ROUTES

app.use('/users', userRouter)

// Error Handling Middleware: Handle requests for undefined routes
app.all("*", (req, _, next) => {
  const err = new Error(`Can't Find ${req.originalUrl}`);
  err.status = "fail";
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

// Error Controller: Handle errors generated during request processing
app.use(errorController);

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}...👍`);
})