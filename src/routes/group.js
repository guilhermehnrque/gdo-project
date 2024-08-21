const express = require('express');
const router = express.Router();
const { validateGroupCreate } = require('../validators/Groups/GroupCreateValidator')
const { validateGroupDetail } = require('../validators/Groups/GroupDetailValidator')	
const { validateGroupPut } = require('../validators/Groups/GroupPutValidator')
const { validateGroupStatusValidator } = require('../validators/Groups/GroupUpdateStatusValidator')
const { groupMemberValidator } = require('../validators/Groups/GroupMemberValidator')
const GroupController = require('../controllers/GroupController')

const groupController = new GroupController();

router.post('', validateGroupCreate, (request, response) => groupController.createGroup(request, response))
router.get('', (request, response) => groupController.getUserGroups(request, response))
router.get('/:groupId', validateGroupDetail, (request, response) => groupController.getGroupById(request, response))
router.put('/:groupId', validateGroupPut, (request, response) => groupController.updateGroupById(request, response))
router.patch('/:groupId/status', validateGroupStatusValidator, (request, response) => groupController.updateGroupStatus(request, response))
router.post('/member', groupMemberValidator, (request, response) => groupController.insertGroupMember(request, response))

module.exports = router;