require('dotenv').config();
const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI;
// console.log(MongoDB_URI);

const connectMongo = () => {
  mongoose.connect(MongoDB_URI)
    .then(() => console.log('MongoDb is connected successfully'))
    .catch((err) => console.error(err));
}

module.exports = connectMongo;