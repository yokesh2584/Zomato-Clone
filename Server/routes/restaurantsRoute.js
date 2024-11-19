const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantsController');

const restaurantController = new RestaurantController();

router.get('/restaurants', (req, res) => restaurantController.getAllRestaurants(req, res));

router.get('/restaurants/:city?', (req, res) => restaurantController.filterRestaurants(req, res));

router.post('/postRestaurants', (req, res) => restaurantController.addRestaurant(req, res));

router.post('/filter', (req, res) => restaurantController.getFilteredRestaurants(req, res));

module.exports = router;