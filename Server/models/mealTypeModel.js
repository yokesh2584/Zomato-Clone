const mongoose = require('mongoose');

// Define the schema for a meal type
const mealTypeSchema = new mongoose.Schema({
    name: String,
    content: String,
    image: String,
    meal_type: Number
});

const MealType = mongoose.model('MealType', mealTypeSchema);

module.exports = class MealTypeModel {
    async getAllMealTypes() {
        try {
            // Fetch all meal types from the MongoDB collection
            return await MealType.find({});
        } catch (error) {
            throw new Error("Error fetching meal types from MongoDB");
        }
    }
};