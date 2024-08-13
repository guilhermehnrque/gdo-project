const GroupService = require('../services/GroupService');
class GroupController {

    constructor() {
        this.groupService = new GroupService();
    }
    async createGroup(request, response) {
        try {
            await this.groupService.createGroup(request.body)

            response.status(201).json({ message: 'Grupo registrado' })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    handleErrorResponse(response, error) {
        const statusCode = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
        response.status(statusCode).json({ error: error.message });
    }

}

module.exports = GroupController;