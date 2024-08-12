const UserManagementService = require('../services/UserManagement/UserManagementService');
const { validationResult } = require('express-validator');

class UserManagementController {

    constructor() {
        this.userService = new UserManagementService();
    }

    async createUser(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            await this.userService.createUser(request.body)

            response.status(201).json({ message: 'Usuário registrado' })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    async login(request, response) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        try {
            this.handleValidationErrors(response, validationResult(request));

            const token = await this.userService.loginUser(request.body)

            response.status(200).json({ token })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    handleErrorResponse(response, error) {
        const statusCode = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
        response.status(statusCode).json({ error: error.message });
    }

}

module.exports = UserManagementController;