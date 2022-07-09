if(process.env.NODE_ENV !== 'production') require('dotenv').config()

// Require and init Express
const express = require('express')
const app = express()

// Init Database
const connectDB = require('./config/db')
connectDB()

// Require Express utilities
const helmet = require('helmet')
const morgan = require('morgan')

// Init Express utilities
app.use(helmet())
app.use(morgan('common'))

// Allow JSON and URL Encoded body data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Require and init router
app.use('/api', require('./routes/router'))

// Require and init errorHandler middleware
app.use(require('./middleware/error.middleware'))

app.listen(process.env.PORT, () => { console.log(`Server listening on ${process.env.PORT}`) })