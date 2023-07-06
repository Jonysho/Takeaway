const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
const { checkout } = require('../controllers/checkoutController');

router.post("/create-checkout-session", checkout)

module.exports = router