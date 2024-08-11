const express = require('express');
const router = express.Router();
const UserManagementController = require('../controllers/UserManagementController');

const userManagementController = new UserManagementController();

router.get('', (request, response) => userManagementController.getAllUsers(request, response));
router.post('', (request, response) => userManagementController.createUser(request, response));
router.post('/login', (request, response) => userManagementController.login(request, response));

module.exports = router;