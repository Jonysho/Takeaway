const express = require('express');
const router = express.Router();
const path = require('path');

const requireAuth = require('../middleware/requireAuth');
const { addToCart, getCart, clearCart, removeFromCart } = require('../controllers/cartController');

router.use(requireAuth)

router.get("/:id", getCart)
router.post('/add', addToCart)
router.patch('/remove', removeFromCart)
router.patch('/clear', clearCart)

module.exports = router