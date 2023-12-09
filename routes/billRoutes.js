const express = require('express')
const { protect } = require('../controllers/userController')
const { generateReport, getBills, deleteBill } = require('../controllers/billController')

const router = express.Router()

router.use(protect)

router.post('/generateReport', generateReport)
router.get('/', getBills)
router.delete('/:id', deleteBill)

module.exports = router