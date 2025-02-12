// backend/routes/farmers.js
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// Create a new farmer
router.post('/', async (req, res) => {
    try {
        const farmer = new Farmer(req.body);
        await farmer.save();
        res.send(farmer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.send(farmers);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;