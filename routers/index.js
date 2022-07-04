const express = require('express')
const router = express.Router()
const { generalErrorHandler } = require('../middleware/error-handler')
const userController = require('../controllers/user-controller')
const courseController = require('../controllers/course-controller')
const user = require('./modules/user')
const admin = require('./modules/admin')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/courses/:id', courseController.getCourse)
router.get('/courses', courseController.getCourses)

router.use('/users', authenticated, user)
router.use('/admin', authenticated, authenticatedAdmin, admin)

router.use('/', generalErrorHandler)

module.exports = router
