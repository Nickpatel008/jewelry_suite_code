require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 8000
const authRoute = require('./routes/auth/authRoute')
const jewelryRoute = require('./routes/jewelry/jewelryRoute')

const app = express()

app.use(express.json())
app.use(cors())

// ? API Routes...
app.use('/api/auth', authRoute)
app.use('/api/jewelry', jewelryRoute)

app.listen(PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`))