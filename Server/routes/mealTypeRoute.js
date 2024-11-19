const express = require('express');
const router = express.Router();
const MealTypeController = require('../controllers/mealTypeController');

const mealTypeController = new MealTypeController();

router.get('/mealType', (req, res) => mealTypeController.getAllMealType(req, res));

module.exports = router;