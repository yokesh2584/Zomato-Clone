const MealTypeModel = require('../models/mealTypeModel');

module.exports = class MealTypeController {
    async getAllMealType(req, res){
        try{
            const mealTypeModel = new MealTypeModel();
            const mealType = await mealTypeModel.getAllMealTypes();
            res.status(200).json(mealType);
        } catch (err){
            res.status(500).json({message: 'Error fetching mealType'});
        }
    }
}