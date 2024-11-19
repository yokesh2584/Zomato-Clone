const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  city: String,
  image: String,
  location_id: Number,
  menu: [
    {
      name: String,
      price: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);