const express = require('express')
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { protect, restrictTo } = require('../controllers/userController')

const router = express.Router()

router.use(protect)

router.get('/', getProducts)
router.get('/:id', getProductById)

router.post('/', restrictTo('admin'), createProduct)
router.patch('/:id', restrictTo('admin'), updateProduct)
router.delete('/:id', restrictTo('admin'), deleteProduct)

module.exports = router