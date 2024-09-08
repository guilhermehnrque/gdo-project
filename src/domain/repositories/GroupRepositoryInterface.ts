import { GroupEntity } from "../entity/GroupEntity";
import { Group } from "../models/GroupModel";

export interface GroupRepositoryInterface {
    createGroup(groupEntity: GroupEntity, options: any): Promise<Group>;
    getUserGroupsByUserId(id: number): Promise<Group[]>;
    getOwnerGroupByIdAndUserId(groupId: number, userId: number): Promise<Group | null>;
    getGroupById(groupId: number): Promise<Group | null>;
    updateGroupById(groupEntity: GroupEntity): Promise<number>;
    changeGroupStatus(groupEntity: GroupEntity): Promise<number>;
    getGroupByDescription(groupDescription: string): Promise<Group | null>;
    deleteGroupById(groupId: number, userId: number): Promise<void>;
}