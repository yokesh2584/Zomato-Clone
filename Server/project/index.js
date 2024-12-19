const express = require('express');
const app = express();
const cors = require('cors');

const connectMongo = require('../config/db');

connectMongo();

const restaurantRoute = require('../routes/restaurantsRoute');
const locationsRoute = require('../routes/locationsRoute');
const mealTypeRoute = require('../routes/mealTypeRoute');
const menuItemsRoute = require('../routes/menuItemsRoute');
const paymentRoute = require('../routes/paymentRoute');
const authRoutes = require('../routes/authRoutes');


app.use(cors({ "origin": 'https://myzomatoclone.vercel.app', "origin": 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.all('/', (req, res) => {
    res.send('Welcome to the Zomato Backend API');
  });

app.use('/', restaurantRoute);
app.use('/', locationsRoute);
app.use('/', mealTypeRoute);
app.use('/', menuItemsRoute);
app.use('/', paymentRoute);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).send('Route Not Found');
  });


const port = 8700;
app.listen(port, ()=>{
    console.log(`Server is now listening to port ${port}`);
});

module.exports = app;