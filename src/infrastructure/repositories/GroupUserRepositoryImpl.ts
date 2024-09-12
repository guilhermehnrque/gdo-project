import { Transaction } from "sequelize";
import { CustomError } from "../../application/erros/CustomError";
import { GroupsUsers } from "../../domain/models/GroupUserModel";
import { User } from "../../domain/models/UserModel";
import { GroupUserInterface } from "../../domain/repositories/GroupUserInterface";
import DatabaseError from "../../application/erros/DatabaseError";


export class GroupUserRepositoryImpl implements GroupUserInterface {
    async createGroupUser(groupId: number, usersId: Array<number>, options: { transaction?: Transaction }): Promise<GroupsUsers[]> {
        try {
            const groupUsers = usersId.map(userId => ({
                groups_id: groupId,
                users_id: userId
            }));

            return await GroupsUsers.bulkCreate(groupUsers, { transaction: options.transaction });

        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepository] createGroupUser Error creating group user: ${customError.message}`);
        }
    }

    async removeGroupUser(groupId: number, usersId: Array<number>, options: { transaction?: Transaction }): Promise<number> {
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
            throw new DatabaseError(`[GroupUserRepository] removeGroupUser Error removing group user: ${customError.message}`);
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
            throw new DatabaseError(`[GroupUserRepository] getAllGroupMembers Error getting all group members: ${customError.message}`);
        }
    }

    async checkIfUserIsInGroup(userId: number, groupId: number): Promise<boolean> {
        try {
            const groupUser = await GroupsUsers.findOne({
                where: {
                    users_id: userId,
                    groups_id: groupId
                }
            });

            return groupUser !== null;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupUserRepository] checkIfUserIsInGroup Error checking if user is in group: ${customError.message}`);
        }
    }


}

