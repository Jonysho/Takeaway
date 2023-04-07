const express = require('express');
const router = express.Router();
const { addUser, getUser, deleteUser, getAllUsers, updateUser } = require('../controllers/user')

router.post('/add-user', addUser)
    .get('/', getAllUsers)
    .get('/get-user/:id', getUser)
    .delete('/delete-user/:id', deleteUser)
    .patch('/update-user/:id', updateUser)

module.exports = router