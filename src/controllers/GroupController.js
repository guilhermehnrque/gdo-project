const GroupService = require('../services/GroupService/GroupService')
const GroupRegisterDTO = require('../dtos/GroupRegisterDTO')

class GroupController {

    constructor() {
        this.groupService = new GroupService();
    }
    async createGroup(request, response) {
        const registerGroupDTO = GroupRegisterDTO.fromRequest(request.body);

        try {
            await this.groupService.createGroup(registerGroupDTO, request.userId)
            response.status(201).json({ message: 'Grupo registrado' })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }

    }

    async getUserGroups(request, response) {   
        try {
            const userGroup = await this.groupService.getUserGroups(request.userId)
            response.status(200).json(userGroup)
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