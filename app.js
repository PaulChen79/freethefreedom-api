require('dotenv').config()
const express = require('express')
const session = require('express-session')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))

app.listen(PORT, () => {
	console.log(`app listening on port ${PORT}`)
})

module.exports = app