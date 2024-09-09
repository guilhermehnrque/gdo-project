import { Transaction } from "sequelize";
import { GroupsUsers } from "../models/GroupUserModel";

export interface GroupUserInterface {
    createGroupUser(groupId: number, usersId: Array<number>, options: { transaction?: Transaction }): Promise<GroupsUsers[]>;
    removeGroupUser(groupId: number, usersId: Array<number>, options: { transaction?: Transaction }): Promise<number>;
    getAllGroupMembers(groupId: number): Promise<GroupsUsers[]>;
    checkIfUserIsInGroup(userId: number, groupId: number): Promise<boolean>;
}