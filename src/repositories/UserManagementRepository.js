const UserModel = require('../models/user')

class UserManagementRepository {
    async createUser(userEntity) {
        const user = UserModel.build(userEntity)
        return await user.save();
    }

    async getAllUsers() {
        return await UserModel.findAll()
    }

    async getUserByLogin(login) {
        return await UserModel.findOne({ where: { login } })
    }

}

module.exports = UserManagementRepository