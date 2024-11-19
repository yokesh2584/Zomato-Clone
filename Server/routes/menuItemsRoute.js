const express = require('express');
const router = express.Router();
const menuItemsController = require('../controllers/menuItemsController');


router.get('/menuItems', (req, res) => menuItemsController.getAllMenuItems(req, res));

router.get('/menuItems/:locationId', (req, res) => menuItemsController.getMenuItemsByLocationId(req, res));

module.exports = router;