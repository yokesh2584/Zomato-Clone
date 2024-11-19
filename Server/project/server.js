const express = require('express');

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI;

mongoose.connect(MongoDB_URI)
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
});


const cors = require('cors');
const restaurantRoute = require('../routes/restaurantsRoute');
const locationsRoute = require('../routes/locationsRoute');
const mealTypeRoute = require('../routes/mealTypeRoute');
const menuItemsRoute = require('../routes/menuItemsRoute');
const paymentRoute = require('../routes/paymentRoute');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', restaurantRoute);
app.use('/', locationsRoute);
app.use('/', mealTypeRoute);
app.use('/', menuItemsRoute);
app.use('/', paymentRoute);

const port = 8700;
app.listen(port, ()=>{
    console.log(`Server is now listening to port ${port}`);
});