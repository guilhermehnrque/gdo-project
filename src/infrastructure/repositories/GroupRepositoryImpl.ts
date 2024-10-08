// Entities
import { GroupEntity } from "../../domain/entity/GroupEntity";

// Interfaces
import { GroupRepositoryInterface } from "../../domain/repositories/GroupRepositoryInterface";

// Models
import { Group } from "../../domain/models/GroupModel";
import { Local } from "../../domain/models/LocalModel";

// Errors
import DatabaseError from "../../application/erros/DatabaseError";
import { CustomError } from "../../application/erros/CustomError";
import { Transaction } from "sequelize";

export class GroupRepositoryImpl implements GroupRepositoryInterface {

    async createGroup(groupEntity: GroupEntity, options: { transaction?: Transaction }): Promise<Group> {
        try {
            return await Group.create(groupEntity.toCreatePayload(), { transaction: options.transaction });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error creating group: ${customError.message}`);
        }
    }

    async getUserGroupsByUserId(id: number): Promise<Group[]> {
        try {
            return await Group.findAll({
                where: { users_id: id },
                include: [
                    {
                        model: Local,
                        as: 'local',
                    }
                ],
                paranoid: false
            });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error creating group: ${customError.message}`);
        }
    }

    async getOwnerGroupByIdAndUserId(groupId: number, userId: number): Promise<Group | null> {
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

    async getGroupByDescription(groupDescription: string): Promise<Group | null> {
        try {
            return await Group.findOne({ where: { description: groupDescription } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error getting group by description: ${customError.message}`);
        }
    }

    async updateGroupById(groupEntity: GroupEntity): Promise<number> {
        try {
            const [affectedCount] = await Group.update(groupEntity.toUpdatePayload(), {
                where: {
                    id: groupEntity.id!,
                    users_id: groupEntity.users_id
                }
            });
            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error getting group by id: ${customError.message}`);
        }
    }

    async changeGroupStatus(groupEntity: GroupEntity): Promise<number> {
        try {
            const [affectedCount] = await Group.update(groupEntity.toUpdatePayload(),
                {
                    where: {
                        id: groupEntity.id!,
                        users_id: groupEntity.users_id
                    }
                });
            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error changing group status: ${customError.message}`);
        }
    }

    async deleteGroupById(groupId: number, userId: number): Promise<void> {
        try {
            await Group.destroy({ where: { id: groupId, users_id: userId } });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error changing group status: ${customError.message}`);
        }
    }

    async getGroupById(groupId: number): Promise<Group | null> {
        try {
            return await Group.findByPk(groupId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error getting group by id: ${customError.message}`);
        }
    }

}