const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const courseController = require('../../controllers/course-controller')
const scheduleController = require('../../controllers/schedule-controller')

router.put('/systems/:id', adminController.updateSystem)
router.delete('/systems/:id', adminController.deleteSystem)
router.post('/systems', adminController.createSystem)

router.get('/schedules/:id', scheduleController.getSchedule)
router.put('/schedules/:id', adminController.updateSchedule)
router.delete('/schedules/:id', adminController.deleteSchedule)
router.get('/schedules', scheduleController.getSchedules)
router.post('/schedules', adminController.createSchedule)

router.get('/courses/:id', courseController.getCourse)
router.put('/courses/:id', adminController.updateCourse)
router.delete('/courses/:id', adminController.deleteCourse)
router.get('/courses', courseController.getCourses)
router.post('/courses', adminController.createCourse)

router.get('/users/:id', adminController.getUser)
router.patch('/users/:id', adminController.setAuthToUser)
router.get('/users', adminController.getUsers)

module.exports = router
