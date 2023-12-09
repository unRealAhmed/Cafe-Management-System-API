const express = require('express')
const { addCategory, getCategories, updateCategory } = require('../controllers/categoryController')
const { protect, restrictTo } = require('../controllers/userController')

const router = express.Router()

router.get('/', getCategories)

router.use(protect, restrictTo('admin'))

router.post('/', addCategory)
router.patch('/update/:id', updateCategory)

module.exports = router