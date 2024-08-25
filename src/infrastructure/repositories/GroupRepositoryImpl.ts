import GroupEntity from "../../domain/entity/GroupEntity";
import { GroupRepositoryInterface } from "../../domain/repositories/GroupRepositoryInterface";
import Group from "../../domain/models/GroupModel";
import DatabaseError from "../../application/erros/DatabaseError";
import CustomError from "../../application/erros/CustomError";
import Local from "../../domain/models/LocalModel";

export default class GroupRepositoryImpl implements GroupRepositoryInterface {

    async createGroup(groupEntity: GroupEntity, options: { transaction?: any }): Promise<Group> {
        try {
            return await Group.create(groupEntity.toCreatePayload(), { transaction: options.transaction });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error creating group: ${customError.message}`);
        }
    }

    async getUserGroupsByUserId(id: number): Promise<Group[]> {
        return await Group.findAll({
            where: { users_id: id },
            include: [
                {
                    model: Local,
                    as: 'local',
                }
            ]
        });
    }

    async getGroupById(groupId: number, userId: number): Promise<Group | null> {
        try {
            return await Group.findOne({
                where: { id: groupId, users_id: userId },
                include: [
                    {
                        model: Local,
                        as: 'local',
                    }
                ]
            });

        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error getting group by id: ${customError.message}`);
        }

    }

    async getGroupByDescription(groupDescription: string): Promise<boolean> {
        const group = await Group.findOne({ where: { description: groupDescription } });
        return group !== null;
    }

    async updateGroupById(groupEntity: GroupEntity): Promise<any> {
        try {
            return await Group.update(groupEntity.toUpdatePayload(), {
                where: {
                    id: groupEntity.id!,
                    users_id: groupEntity.users_id
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error getting group by id: ${customError.message}`);
        }
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