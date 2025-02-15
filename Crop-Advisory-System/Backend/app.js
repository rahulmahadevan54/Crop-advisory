// backend/app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const farmersRouter = require('./routes/farmers');
const cors = require('cors');

mongoose.connect('mongodb://localhost/crop-advisory-system', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

app.use(express.json());
app.use(cors());

app.use('/farmers', farmersRouter);

const port = 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
