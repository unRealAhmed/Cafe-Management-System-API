const express = require('express')
const { addCategory, getCategories, updateCategory } = require('../controllers/categoryController')
const { protect, restrictTo } = require('../controllers/userController')
const validation = require('../middleware/validationFunction')
const categoryValidation = require('../validation/categoryValidation')

const router = express.Router()

router.get('/', getCategories)

router.use(protect, restrictTo('admin'))

router.post('/', validation(categoryValidation), addCategory)
router.patch('/update/:id', updateCategory)

module.exports = router