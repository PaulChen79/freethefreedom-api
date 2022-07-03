const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const user = require('./modules/user')

router.use('/users', user)

router.use('/', generalErrorHandler)

module.exports = router
