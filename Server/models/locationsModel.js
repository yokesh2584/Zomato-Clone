const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    name: String,
    city_id: Number,
    location_id: Number,
    city: String,
    country_name: String
});

const Location =mongoose.model('Location', locationSchema);

module.exports = class LocationsModel {
    
    async getAllLocations() {
        try {
            // Fetch all locations from the MongoDB collection
            return await Location.find({});
        } catch (error) {
            throw new Error("Error fetching locations from MongoDB");
        }
    }
}