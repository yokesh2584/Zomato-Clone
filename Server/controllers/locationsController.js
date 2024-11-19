const LocationsModel = require('../models/locationsModel');

module.exports = class LocationsController {
    async getAllLocations (req, res){
        try{
            const locationsModel = new LocationsModel();
            const locations = await locationsModel.getAllLocations();
            res.status(200).json(locations);
        } catch (err){
            res.status(500).json({message: 'Error fetching locations'});
        }
    }
}