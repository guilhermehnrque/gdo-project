import { GroupsUsers } from "../models/GroupUserModel";

export interface GroupUserInterface {
    createGroupUser(groupId: number, usersId: Array<number>, options: any): Promise<GroupsUsers[]>;
    removeGroupUser(groupId: number, usersId: Array<number>, options: any): Promise<number>;
}