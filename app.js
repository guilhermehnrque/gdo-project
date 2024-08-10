require('dotenv').config();
const express = require('express');
const debugRoute = require("./src/routes/debug")

const app = express();

app.use(express.json()); 

app.use('/api/debug', debugRoute);

module.exports = app;
