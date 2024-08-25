import GroupEntity from "../entity/GroupEntity";
import Group from "../models/GroupModel";

export interface GroupRepositoryInterface {
    createGroup(groupEntity: GroupEntity, options: any): Promise<Group>;
    getUserGroupsByUserId(id: number): Promise<Group[]>;
    getGroupById(): Promise<any>;
    updateGroupById(): Promise<any>;
    changeGroupStatus(): Promise<any>;
    deleteGroupById(): Promise<any>;
    addUserToGroup(): Promise<any>;
    removeUserFromGroup(): Promise<void>;
    getGroupByDescription(groupDescription: string): Promise<boolean>;
}