const express = require('express');
const router = express.Router();
const { validateRequest } = require('../validators/GroupValidator');
const GroupController = require('../controllers/GroupController');

const groupController = new GroupController();

router.post('', validateRequest, (request, response) => groupController.createGroup(request, response));

module.exports = router;