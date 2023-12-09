const express = require('express')
const { addCategory, getCategories, updateCategory } = require('../controllers/categoryController')
const { protect } = require('../controllers/userController')

const router = express.Router()

router.get('/', getCategories)

router.use(protect)

router.post('/', addCategory)
router.patch('/update/:id', updateCategory)

module.exports = router