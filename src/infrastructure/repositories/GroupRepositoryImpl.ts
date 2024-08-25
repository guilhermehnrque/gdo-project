import GroupEntity from "../../domain/entity/GroupEntity";
import { GroupRepositoryInterface } from "../../domain/repositories/GroupRepositoryInterface";
import Group from "../../domain/models/GroupModel";
import DatabaseError from "../../application/erros/DatabaseError";
import CustomError from "../../application/erros/CustomError";

export default class GroupRepositoryImpl implements GroupRepositoryInterface {

    async createGroup(groupEntity: GroupEntity, options: { transaction?: any }): Promise<Group> {
        try {
            return await Group.create(groupEntity.toCreatePayload(), { transaction: options.transaction });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error creating group: ${customError.message}`);
        }
    }

    async getUserGroupsByUserId(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getGroupById(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getGroupByDescription(groupDescription: string): Promise<boolean> {
        const group = await Group.findOne({ where: { description: groupDescription } });
        return group !== null;
    }

    async updateGroupById(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async changeGroupStatus(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async deleteGroupById(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async addUserToGroup(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async removeUserFromGroup(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}