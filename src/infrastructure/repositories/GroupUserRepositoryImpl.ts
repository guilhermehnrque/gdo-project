import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import GroupsUsers from "../../domain/models/GroupUserModel";
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
    

}

