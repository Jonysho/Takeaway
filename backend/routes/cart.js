const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const { addToCart, getCart, clearCart, removeFromCart, favouriteCart, loadFavourite } = require('../controllers/cartController');

router.use(requireAuth)

router.get("/:id", getCart)
router.post('/add', addToCart)
router.patch('/remove', removeFromCart)
router.patch('/clear', clearCart)

router.post('/favourite/add', favouriteCart)
router.patch('/favourite/load', loadFavourite)

module.exports = router