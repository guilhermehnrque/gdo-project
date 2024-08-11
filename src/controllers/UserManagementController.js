const UserManagementService = require('../services/UserManagement/UserManagementService');

class UserManagementController {

    constructor() {
        this.userService = new UserManagementService();
    }

    async createUser(request, response) {
        try {
            await this.userService.createUser(request.body)
            response.status(201).json({ message: 'User created successfully' })
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    async getAllUsers(request, response) {
        try {
            const users = await this.userService.getAllUsers()
            response.status(200).json(users)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    async login(request, response) {
        try {
            const token = await this.userService.loginUser(request.body)

            response.status(200).json({ token })
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }


}

module.exports = UserManagementController;