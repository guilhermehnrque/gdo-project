const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');

const groupController = new GroupController();

router.post('', (request, response) => groupController.createGroup(request, response));

module.exports = router;