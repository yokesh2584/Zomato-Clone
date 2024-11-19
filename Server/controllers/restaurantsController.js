const RestaurantModel = require('../models/restaurantsModel');

module.exports = class RestaurantController {
    async getAllRestaurants(req, res){
        try {
            const restaurantModel = new RestaurantModel();
            const restaurants = await restaurantModel.getAllRestaurants();
            res.status(200).json(restaurants);
        } catch (err){
            res.status(500).json({message: 'Error fetching restaurants'});
        }
    }

    async filterRestaurants(req, res){
        try {
            const restaurantModel = new RestaurantModel();
            const city = req.params.city;
            // console.log('City:', city);

            const filteredRestaurants = await restaurantModel.filterRestaurants(city);
            // console.log('Filtered Restaurants:', filteredRestaurants);

            res.status(200).json(filteredRestaurants);
        } catch (err){
            console.error('Error filtering restaurants:', err);
            res.status(500).json({message: 'Error filtering restaurants'});
        }
    }

    async addRestaurant(req, res) {
      try {
        const restaurantModel = new RestaurantModel();
        const newRestaurant = req.body;
        const savedRestaurant = await restaurantModel.addRestaurant(newRestaurant);
        res.status(201).json({
          message: 'Data posted successfully',
          data: savedRestaurant,
        });
      } catch (err) {
        res.status(500).json({ message: 'Error posting data' });
      }
    }

    async getFilteredRestaurants(req, res) {
        try {
            let {
                mealType,
                location,
                cuisine,
                lowCost,
                highCost,
                sort = 1,  
                page = 1  
            } = req.body;
    
            const limit = 2; // Set items per page to 2
            const skip = (page - 1) * limit;
    
            const filterOptions = {
                mealtype_id: Number(mealType),
                location_id: Number(location),
                cuisine: Array.isArray(cuisine) ? cuisine.map(Number) : undefined,
                min_price: lowCost ? Number(lowCost) : undefined,
                max_price: highCost ? Number(highCost) : undefined,
                sort,
                skip,
                limit,
            };
    
            const restaurantModel = new RestaurantModel();
            
            // Get filtered results and total count for pagination
            const { restaurants, totalCount } = await restaurantModel.filteredRestaurants(filterOptions);
            
            // Calculate pageCount based on total results
            const pageCount = Math.ceil(totalCount / limit);
    
            res.status(200).json({
                message: 'Restaurants fetched successfully',
                data: restaurants,
                pageCount,
                currentPage: page
            });
        } catch (err) {
            console.error('Error fetching filtered restaurants:', err);
            res.status(500).json({ 
                message: 'Error fetching restaurants',
                error: err.message 
            });
        }
    }
    
    
    
}