const GroupModel = require('../models/group')
const LocalModel = require('../models/local')

class GroupRepository {
    async createGroup(description, id, active,  options = {}) {
        return GroupModel.create({ description, users_id: id, is_active: active }, options)
    }

    async getGroupsById(id) {
        return GroupModel.findAll({
            where: { users_id: id },
            include: [
                {
                    model: LocalModel,
                    as: 'local',
                }
            ]
        })
    }

    async getGroupByDescription(description) {
        return GroupModel.findOne({
            where: { description }
        })
    }

    async getGroupById(id) {
        return GroupModel.findOne({
            where: { id },
            include: [
                {
                    model: LocalModel,
                    as: 'local',
                }
            ]
        })
    }
}

module.exports = GroupRepository;
