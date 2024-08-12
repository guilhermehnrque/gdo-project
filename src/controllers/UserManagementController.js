const UserManagementService = require('../services/UserManagement/UserManagementService');

class UserManagementController {

    constructor() {
        this.userService = new UserManagementService();
    }

    handleErrorResponse(response, error) {
        const statusCode = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
        response.status(statusCode).json({ error: error.message });
    }

    async createUser(request, response) {
        try {
            await this.userService.createUser(request.body)
            response.status(201).json({ message: 'Usuário registrado' })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    async getAllUsers(request, response) {
        try {
            const users = await this.userService.getAllUsers()
            response.status(200).json(users)
        } catch (error) {
            response.status(error.statusCode).json({ error: error.message })
        }
    }

    async login(request, response) {
        try {
            const token = await this.userService.loginUser(request.body)
            response.status(200).json({ token })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

}

module.exports = UserManagementController;