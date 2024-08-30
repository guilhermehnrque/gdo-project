import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import { GroupsUsers } from "../../domain/models/GroupUserModel";
import { User } from "../../domain/models/UserModel";
import { GroupUserInterface } from "../../domain/repositories/GroupUserInterface";

export class GroupUserRepositoryImpl implements GroupUserInterface {
    async createGroupUser(groupId: number, usersId: Array<number>, options: any): Promise<GroupsUsers[]> {
        try {
            const groupUsers = usersId.map(userId => ({
                groups_id: groupId,
                users_id: userId
            }));

            return await GroupsUsers.bulkCreate(groupUsers, { transaction: options.transaction });

        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepository] Error creating group user: ${customError.message}`);
        }
    }

    async removeGroupUser(groupId: number, usersId: Array<number>, options: any): Promise<number> {
        try {
            return await GroupsUsers.destroy({
                where: {
                    groups_id: groupId,
                    users_id: usersId
                },
                transaction: options.transaction
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepository] Error removing group user: ${customError.message}`);
        }
    }

    async getAllGroupMembers(groupId: number): Promise<GroupsUsers[]> {
        try {
            return await GroupsUsers.findAll({
                where: {
                    groups_id: groupId,
                },
                include: {
                    model: User,
                    as: 'player',
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepository] Error getting all group members: ${customError.message}`);
        }
    }


}

