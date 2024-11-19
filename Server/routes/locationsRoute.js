const express = require('express');
const router = express.Router();
const LocationsController = require('../controllers/locationsController');

const locationsController = new LocationsController();

router.get('/locations', (req, res) => locationsController.getAllLocations(req, res));

module.exports = router;