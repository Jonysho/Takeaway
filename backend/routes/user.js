const express = require('express');
const {getUserDetails, changePassword, updateDetails } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Protected Routes 
router.use(requireAuth)
router.get('/:id', getUserDetails)
router.patch('/change-password/:id', changePassword)
router.patch('/update-details/:id', updateDetails)

module.exports = router