const GroupRepository = require('../../repositories/GroupRepository')
const LocalRepository = require('../../repositories/LocalRepository')
const userManagementRepository = require('../../repositories/UserManagementRepository')
const logger = require('../../utils/LoggerUtils');
const sequelize = require('../../config/database');

class GroupService {

    constructor() {
        this.userManagementRepository = new userManagementRepository()
        this.groupRepsitory = new GroupRepository()
        this.localRepository = new LocalRepository()
    }

    async createGroup(groupRegisterDTO, userId) {
        const user = await this.userManagementRepository.getUserByUserId(userId)

        if (!user) {
            this.logAndThrow(new Error('Usuário não encontrado'), userId)
        }

        const transaction = await sequelize.transaction();

        try {
            const group = await this.groupRepsitory.createGroup(groupRegisterDTO.getDescription(), user.id, { transaction })

            const local = await this.localRepository.createLocal(groupRegisterDTO.getLocal(), group.id, { transaction })

            await Promise.all([
                group.save({ transaction }),
                local.save({ transaction })
            ])

            await transaction.commit()

            return group

        } catch (error) {
            await transaction.rollback()

            console.log(error)

            throw error;
        }
    }

    logAndThrow(error, context) {
        logger.error(`[${error.name}] ${error.message} -> ${context}`);
        throw error;
    }
}

module.exports = GroupService;
