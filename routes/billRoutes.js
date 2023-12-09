const express = require('express')
const { protect } = require('../controllers/userController')
const { generateReport, getBills, deleteBill } = require('../controllers/billController')
const validation = require('../middleware/validationFunction')
const billValidation = require('../validation/billValidation')

const router = express.Router()

router.use(protect)

router.post('/generateReport', validation(billValidation), generateReport)
router.get('/', getBills)
router.delete('/:id', deleteBill)

module.exports = router