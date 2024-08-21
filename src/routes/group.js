const express = require('express');
const router = express.Router();
const { validateGroupCreate } = require('../validators/GroupCreateValidator')
const GroupController = require('../controllers/GroupController')

const groupController = new GroupController();

router.post('', validateGroupCreate, (request, response) => groupController.createGroup(request, response))
router.get('', (request, response) => groupController.getUserGroups(request, response))

module.exports = router;