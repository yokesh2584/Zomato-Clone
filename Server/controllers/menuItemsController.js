// menuItemsController.js
const menuItemModel = require('../models/menuItemsModel');

exports.getAllMenuItems = (req, res) => {
  menuItemModel.find()
    .then(menuItems => res.json(menuItems))
    .catch(err => res.status(500).json({ message: 'Error fetching menu items' }));
};

exports.getMenuItemsByLocationId = (req, res) => {
  const locationId = req.params.locationId;
  // console.log('Location ID:', locationId);

  menuItemModel.find({ location_id: locationId })
    .then(menuItems => {
      // console.log('Menu Items Found:', menuItems);
      res.json(menuItems);
    })
    .catch(err => {
      console.error('Error Fetching Menu Items:', err);
      res.status(500).json({ message: 'Error fetching menu items' });
    });
};