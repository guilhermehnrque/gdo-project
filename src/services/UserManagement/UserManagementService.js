const HashPassword = require('../../utils/HashPasswordUtils');
const Jwt = require('../../utils/JwtUtils');
const UserManagementRepository = require('../../repositories/UserManagementRepository');
const RegisterUserDTO = require('./dto/RegisterUserDTO');

class UserManagementService {

    constructor() {
        this.UserManagementRepository = new UserManagementRepository()
    }

    async createUser(payload) {
        const registerUserDTO = RegisterUserDTO.fromRequest(payload)

        return await this.UserManagementRepository.createUser(registerUserDTO)
    }

    async getAllUsers() {
        return await this.UserManagementRepository.getAllUsers()
    }

    async loginUser({ login, password }) {
        const user = await this.UserManagementRepository.getUserByLogin(login)

        const isValidPassword = await HashPassword.comparePassword(password, user.password)

        if (!isValidPassword) {
            throw new Error('Invalid password')
        }

        const token = Jwt.generateToken(user.toJSON())

        return token;
    }
}

module.exports = UserManagementService