require('dotenv').config();
const express = require('express');
const ValidateBearerToken = require('./src/middlewares/ValidateBearerToken');
const usersRoute = require("./src/routes/user")
const groupRoute = require("./src/routes/group")

const app = express()

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/groups', ValidateBearerToken.validateBearerToken, groupRoute)

app.get('/api/protected', ValidateBearerToken.validateBearerToken, (request, response) => {
    response.json({ message: 'You have access to this protected route!', userId: request.userId, userType: request.userType });
})

module.exports = app;
