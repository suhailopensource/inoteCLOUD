const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;


const connectToMongo = () => {
    mongoose.connect(mongoURI);
}

module.exports = connectToMongo;