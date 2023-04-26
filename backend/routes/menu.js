const express = require('express');
const router = express.Router();
const path = require('path');
const { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const requireAdminAuth = require('../middleware/requireAdminAuth');

router.get("/", getMenuItems)
router.get("/pdf", (req, res) => {
    const filePath = path.join(__dirname, '../public/menu.pdf');
    res.sendFile(filePath);
})

// Protected Admin Routes
// router.use(requireAdminAuth)
router.post("/add", addMenuItem)
router.patch("/update/:id", updateMenuItem)
router.delete("/delete/:id", deleteMenuItem)

module.exports = router