const express = require('express');
const router = express.Router();
const { 
    getUserDetails, 
    changePassword, 
    updateDetails, 
    verifyEmail, 
    resendEmail,
    getAllUsers,
    deleteUser,
    getUserFavourites,
    deleteFavourite
 } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const requireAdminAuth = require('../middleware/requireAdminAuth');


router.post("/resend-email", resendEmail)
router.get("/:id/verify/:token", verifyEmail)

// Protect Admin Routes
router.get('/all', requireAdminAuth, getAllUsers)
router.delete('/:id', requireAdminAuth, deleteUser)

// Protected User Routes 
router.get('/:id', requireAuth, getUserDetails)
router.patch('/update-details/:id', requireAuth, updateDetails)
router.get('/favourites/:id', requireAuth, getUserFavourites)
router.patch('/favourites/delete', requireAuth, deleteFavourite)
router.patch('/change-password/:id', requireAuth, changePassword)


module.exports = router