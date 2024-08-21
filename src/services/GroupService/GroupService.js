const GroupRepository = require('../../repositories/GroupRepository')
const LocalRepository = require('../../repositories/LocalRepository')
const userManagementRepository = require('../../repositories/UserManagementRepository')
const UserNotFoundError = require('../../erros/UserNotFoundError')
const GroupAlreadyRegisteredError = require('../../erros/GroupAlreadyRegisteredError')
const GroupNotFoundError = require('../../erros/GroupNotFoundError')
const { DatabaseError } = require('sequelize')
const InvalidUserTypeError = require('../../erros/InvalidUserTypeError')
const logger = require('../../utils/LoggerUtils')
const sequelize = require('../../config/database')
const TinyintToBoolean  = require('../../utils/TinyIntToBoolean')

class GroupService {

    constructor() {
        this.userManagementRepository = new userManagementRepository()
        this.groupRepsitory = new GroupRepository()
        this.localRepository = new LocalRepository()
    }

    // Main functions
    async createGroup(groupRegisterDTO, userId) {
        const user = await this.validateAndGetUser(userId)

        this.validateIsUserStaff(user)

        await this.isGroupAlreadyRegistered(groupRegisterDTO.getDescription())

        const transaction = await sequelize.transaction();

        try {
            const group = await this.groupRepsitory.createGroup(groupRegisterDTO.getDescription(), user.id, true, { transaction })
            const local = await this.localRepository.createLocal(groupRegisterDTO.getLocal(), group.id, { transaction })

            await Promise.all([
                group.save({ transaction }),
                local.save({ transaction })
            ])

            await transaction.commit()

            return group
        } catch (error) {
            await transaction.rollback()

            this.logAndThrow(new DatabaseError('Error no insercao do grupo ou local'), error)
        }
    }

    async getUserGroups(userId) {
        const user = await this.validateAndGetUser(userId)
        return await this.groupRepsitory.getGroupsById(user.id)
    }

    async getGroupById(groupId) {
        const group = await this.groupRepsitory.getGroupById(groupId)

        if (!group) {
            this.logAndThrow(new GroupNotFoundError('Grupo não encontrado'), groupId)
        }

        return group
    }

    async updateGroupById(groupId, groupUpdateDTO) { 
        try {
            return await this.groupRepsitory.updateGroupById(groupId, groupUpdateDTO.toObject())
        } catch (error) {
            console.error(error)
            this.logAndThrow(new GroupNotFoundError('Update nao realizado'), error)
        }
    }

    // Validations
    async validateAndGetUser(userId) {
        const user = await this.userManagementRepository.getUserByUserId(userId)

        if (!user) {
            this.logAndThrow(new UserNotFoundError('Usuário inválido'), userId)
        }

        return user
    }

    async isGroupAlreadyRegistered(description) {
        const group = await this.groupRepsitory.getGroupByDescription(description)

        if (group) {
            this.logAndThrow(new GroupAlreadyRegisteredError('Grupo já cadastrado'), description)
        }
    }

    validateIsUserStaff(user) {
        let isUserStaff = TinyintToBoolean(user.isStaff)

        if (!isUserStaff) {
            this.logAndThrow(new InvalidUserTypeError('Usuário não é staff'), user.id)
        }
    }

    logAndThrow(error, context) {
        logger.error(`[${error.name}] ${error.message} -> ${context}`)
        throw error
    }
    
}

module.exports = GroupService;
