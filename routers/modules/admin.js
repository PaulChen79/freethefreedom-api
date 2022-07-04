const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.put('/systems/:id', adminController.updateSystem)
router.delete('/systems/:id', adminController.deleteSystem)
router.post('/systems', adminController.createSystem)

router.get('/courses/:id', adminController.getCourse)
router.put('/courses/:id', adminController.updateCourse)
router.delete('/courses/:id', adminController.deleteCourse)
router.get('/courses', adminController.getCourses)
router.post('/courses', adminController.createCourse)

router.get('/users/:id', adminController.getUser)
router.patch('/users/:id', adminController.setAuthToUser)
router.get('/users', adminController.getUsers)

module.exports = router
