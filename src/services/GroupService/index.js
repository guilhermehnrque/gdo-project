const GroupRepository = require('../../repositories/GroupRepository');;
const logger = require('../../utils/LoggerUtils');

class GroupService {
    
    constructor() {
        this.groupRepsitory = new GroupRepository();
    }

    async createGroup(payload) {
        return await this.userManagementRepository.createUser(payload);
    }

}

module.exports = GroupService;
