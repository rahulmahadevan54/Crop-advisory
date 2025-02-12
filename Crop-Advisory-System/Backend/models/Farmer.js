// backend/models/Farmer.js
const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    name: String,
    location: String,
    soilType: String,
    weatherConditions: String
});

module.exports = mongoose.model('Farmer', farmerSchema);