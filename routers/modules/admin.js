const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.put('/systems/:id', adminController.updateSystem)
router.delete('/systems/:id', adminController.deleteSystem)
router.post('/systems', adminController.createSystem)

module.exports = router
