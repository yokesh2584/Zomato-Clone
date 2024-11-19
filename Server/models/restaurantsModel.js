// models/restaurantsModel.js
const mongoose = require('mongoose');

// Define the schema for the restaurant data
const restaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  location_id: Number,
  city_id: Number,
  locality: String,
  thumb: [String],
  aggregate_rating: Number,
  rating_text: String,
  min_price: Number,
  contact_number: Number,
  cuisine: [
    {
      id: Number,
      name1: String,
      name2: String,
    },
  ],
  image: String,
  mealtype_id: Number,
});

// Create a model from the schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = class RestaurantModel {
  async getAllRestaurants() {
    try {
      const restaurants = await Restaurant.find();
      return restaurants;
    } catch (err) {
      throw new Error('Error fetching restaurants');
    }
  }

  async filterRestaurants(city) {
    try {
      const query = city ? { city: new RegExp(city, 'i') } : {};
      const filteredRestaurants = await Restaurant.find(query);
      return filteredRestaurants;
    } catch (err) {
      throw new Error('Error filtering restaurants');
    }
  }

  async addRestaurant(newRestaurant) {
    try {
      const restaurant = new Restaurant(newRestaurant);
      const savedRestaurant = await restaurant.save();
      return savedRestaurant;
    } catch (err) {
      throw new Error('Error adding restaurant');
    }
  }

  async filteredRestaurants(filters) {
      try {
          const query = {};
          
          // Basic filters
          if (filters.mealtype_id) query.mealtype_id = filters.mealtype_id;
          if (filters.location_id) query.location_id = filters.location_id;
          
          // Cuisine filter
          if (filters.cuisine && filters.cuisine.length > 0) {
              query.cuisine = {
                  $elemMatch: {
                      $or: [
                          { id: { $in: filters.cuisine } },
                          { name1: { $in: filters.cuisine } },
                          { name2: { $in: filters.cuisine } }
                      ]
                  }
              };
          }

          // Price range filter
          if (filters.min_price && filters.max_price) {
              query.min_price = { $gte: filters.min_price, $lte: filters.max_price };
          } else if (filters.min_price) {
              query.min_price = { $gte: filters.min_price };
          } else if (filters.max_price) {
              query.min_price = { $lte: filters.max_price };
          }

          // Debug logs
          // console.log('Filters received:', filters);
          // console.log('Query built:', JSON.stringify(query, null, 2));

          // Get total count of items matching the query for pagination
          const totalCount = await Restaurant.countDocuments(query);

          // Sorting and pagination
          const sortOption = filters.sort ? { min_price: parseInt(filters.sort) } : {};

          const results = await Restaurant.find(query)
              .sort(sortOption)
              .skip(filters.skip || 0)
              .limit(filters.limit || 10);

          // console.log('Number of results:', results.length);

          return { restaurants: results, totalCount };
      } catch (err) {
          console.error('Database error:', err);
          throw new Error('Error filtering restaurants');
      }
  }


};
