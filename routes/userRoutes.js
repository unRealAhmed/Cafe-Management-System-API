const express = require('express')
const { signUp, login, forgetPassword, resetPassword, protect, updatePassword } = require('../controllers/userController')
const validation = require('../middleware/validationFunction')
const userValidation = require('../validation/userValidation')


const router = express.Router()

router.post('/signup', validation(userValidation), signUp)
router.post('/login', login)
router.post('/forgetPassword', forgetPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect)

router.patch('/updatePassword', updatePassword)

module.exports = router
