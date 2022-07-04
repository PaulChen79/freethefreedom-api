const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user-controller')

router.get('/:id', userController.getProfile)
router.patch('/:id', userController.editProfile)

module.exports = router
