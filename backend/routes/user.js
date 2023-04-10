const express = require('express');
const { login, register, getUserDetails, changePassword, updateDetails } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


router.post('/login', login)
.post('/register', register)

// Protected Routes 
router.use(requireAuth)
router.get('/:id', getUserDetails)
router.patch('/change-password/:id', changePassword)
router.patch('/update-details/:id', updateDetails)

module.exports = router