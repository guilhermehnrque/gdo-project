const GroupModel = require('../models/group')

class GroupRepository {
    async createGroup(groupEntity) {
        const group = GroupModel.build(groupEntity)
        return await group.save();
    }

}

module.exports = GroupRepository