const UserModel = require('../models/user')
const UserEntity = require('../entity/UserEntity')

class UserManagementRepository {
    async createUser(registerUserDTO) {
        const userEntity = await UserEntity.toRegistration(registerUserDTO)

        const user = new UserModel(userEntity)
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