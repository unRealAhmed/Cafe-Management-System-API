require('dotenv').config({ path: './config.env' })
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}...👍`);
})