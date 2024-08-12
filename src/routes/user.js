const express = require('express');
const router = express.Router();
const userValidator = require('../validators/userValidator');
const UserManagementController = require('../controllers/UserManagementController');

const userManagementController = new UserManagementController();

router.post('', userValidator.createUser, (request, response) => userManagementController.createUser(request, response));
router.post('/login', userValidator.loginUser, (request, response) => userManagementController.login(request, response));

module.exports = router;