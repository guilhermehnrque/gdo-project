const GroupService = require('../services/GroupService/GroupService')
const GroupRegisterDTO = require('../dtos/Group/GroupRegisterDTO')
const GroupUpdateDTO = require('../dtos/Group/GroupUpdateDTO')

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

    async getGroupById(request, response) {
        let groupId = request.params.groupId
 
        try {
            const group = await this.groupService.getGroupById(groupId)
            response.status(200).json(group)
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    async updateGroupById(request, response) {
        let groupId = request.params.groupId
        const groupUpdateDTO = GroupUpdateDTO.fromRequest(request.body)
       
        try {
            await this.groupService.updateGroupById(groupId, groupUpdateDTO)
            response.status(200).json({ message: 'Grupo atualizado' })
        } catch (error) {
            this.handleErrorResponse(response, error)
        }
    }

    handleErrorResponse(response, error) {
        const statusCode = error.statusCode && Number.isInteger(error.statusCode) ? error.statusCode : 500;
        response.status(statusCode).json({ error: error.message })
    }

}

module.exports = GroupController
