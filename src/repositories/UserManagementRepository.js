const UserModel = require('../models/user')

class UserManagementRepository {
    async createUser(userEntity) {
        const user = UserModel.build(userEntity)
        return await user.save();
    }

    async getUserByLogin(login) {
        return await UserModel.findOne({ where: { login } })
    }

    async getUserByUserId(userId) {
        return await UserModel.findOne({ where: { user_id: userId } })
    }

}

module.exports = UserManagementRepository