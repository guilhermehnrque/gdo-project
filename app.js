require('dotenv').config();
const express = require('express');
const ValidateBearerToken = require('./src/middlewares/ValidateBearerToken');
const usersRoute = require("./src/routes/user")

const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)

app.get('/api/protected', ValidateBearerToken.validateBearerToken, (request, response) => {
    response.json({ message: 'You have access to this protected route!'});
})

module.exports = app;
