const express = require('express');
const router = express.Router();
const { validateGroupCreate } = require('../validators/Groups/GroupCreateValidator')
const { validateGroupDetail } = require('../validators/Groups/GroupDetailValidator')	
const GroupController = require('../controllers/GroupController')

const groupController = new GroupController();

router.post('', validateGroupCreate, (request, response) => groupController.createGroup(request, response))
router.get('', (request, response) => groupController.getUserGroups(request, response))
router.get('/:groupId', validateGroupDetail, (request, response) => groupController.getGroupById(request, response))

module.exports = router;