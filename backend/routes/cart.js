const express = require('express');
const router = express.Router();
const path = require('path');

const requireAuth = require('../middleware/requireAuth');
const { updateCart, getCart } = require('../controllers/cartController');

router.use(requireAuth)

router.get("/:id", getCart)
router.post('/update', updateCart)
router.post('/clear', updateCart)

module.exports = router