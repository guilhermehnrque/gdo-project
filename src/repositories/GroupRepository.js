const GroupModel = require('../models/group');

class GroupRepository {
    async createGroup(description, id, options = {}) {
        return GroupModel.create({ description, users_id: id }, options)
    }
}

module.exports = GroupRepository;
