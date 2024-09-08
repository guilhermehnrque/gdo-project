import { getGroupVisibility } from "../../../domain/enums/GroupVisibilityEnum";
import { CreateGroupDTO } from "../../dto/group/CreateGroupDTO";
import { GroupDTO } from "../../dto/group/GroupDTO";
import { GroupMemberDTO } from "../../dto/groupMember/GroupMemberDTO";
import { CreateLocalDTO } from "../../dto/local/CreateLocalDTO";
import { CreateGroupUseCase } from "../../usecases/organizer/group/CreateGroupUseCase";
import { DeleteGroupUseCase } from "../../usecases/organizer/group/DeleteGroupUseCase";
import { GetGroupDetailsUseCase } from "../../usecases/organizer/group/GetGroupDetailsUseCase";
import { GetGroupMembersUseCase } from "../../usecases/organizer/group/GetGroupMembersUseCase";
import { GetGroupsUseCase } from "../../usecases/organizer/group/GetGroupsUseCase";
import { RegisterGroupUserUseCase } from "../../usecases/organizer/group/RegisterGroupUserUseCase";
import { RemoveGroupUserUseCase } from "../../usecases/organizer/group/RemoveGroupUserUseCase";
import { UpdateGroupStatusUseCase } from "../../usecases/organizer/group/UpdateGroupStatusUseCase";
import { UpdateGroupUseCase } from "../../usecases/organizer/group/UpdateGroupUseCase";
import { CreateLocalUseCase } from "../../usecases/organizer/locals/CreateLocalUseCase";
import sequelize from "../../../infrastructure/database/index";


export class GroupFacade {

    private createGroupUseCase: CreateGroupUseCase;
    private createLocalUseCase: CreateLocalUseCase;
    private getGroupsUseCase: GetGroupsUseCase;
    private getGroupDetailsUseCase: GetGroupDetailsUseCase;
    private updateGroupUseCase: UpdateGroupUseCase;
    private updateGroupStatusUseCase: UpdateGroupStatusUseCase;
    private registerGroupUserUseCase: RegisterGroupUserUseCase;
    private removeGroupUserUseCase: RemoveGroupUserUseCase;
    private deleteGroupUseCase: DeleteGroupUseCase;
    private getGroupMembersUseCase: GetGroupMembersUseCase;

    constructor() {
        this.createGroupUseCase = new CreateGroupUseCase();
        this.createLocalUseCase = new CreateLocalUseCase();
        this.getGroupsUseCase = new GetGroupsUseCase();
        this.getGroupDetailsUseCase = new GetGroupDetailsUseCase();
        this.updateGroupUseCase = new UpdateGroupUseCase();
        this.updateGroupStatusUseCase = new UpdateGroupStatusUseCase();
        this.registerGroupUserUseCase = new RegisterGroupUserUseCase();
        this.removeGroupUserUseCase = new RemoveGroupUserUseCase();
        this.deleteGroupUseCase = new DeleteGroupUseCase();
        this.getGroupMembersUseCase = new GetGroupMembersUseCase();
    }

    async createGroup(createGroupDTO: CreateGroupDTO, createLocalDTO: CreateLocalDTO, userId: string): Promise<void> {
        const transaction = await sequelize.transaction();
        let groupEntity;

        try {
            groupEntity = await this.createGroupUseCase.execute(createGroupDTO, userId, transaction);

            await this.createLocalUseCase.execute(createLocalDTO, groupEntity.id!, transaction);

            await this.registerGroupUserUseCase.execute([groupEntity.users_id], userId, groupEntity.id!, transaction);

            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async updateGroupById(groupId: number, userId: string, description: string, status: boolean, visibility: string): Promise<number> {
        return await this.updateGroupUseCase.execute(groupId, userId, description, status, getGroupVisibility(visibility));
    }

    async getUserGroupsByUserId(userId: string): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        return await this.getGroupsUseCase.execute(userId);
    }

    async getGroupById(userId: string, groupId: number): Promise<GroupDTO> {
        return await this.getGroupDetailsUseCase.execute(groupId, userId);
    }

    async changeGroupStatus(groupId: number, userId: string, status: boolean): Promise<number> {
        return this.updateGroupStatusUseCase.execute(groupId, userId, status);
    }

    async deleteGroupById(groupId: number, userId: string): Promise<void> {
        return this.deleteGroupUseCase.execute(groupId, userId);
    }

    async addUserToGroup(groupId: number, playersId: number[], userId: string): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await this.registerGroupUserUseCase.execute(playersId, userId, groupId, transaction);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    async removeUsersFromGroup(groupId: number, playersId: number[], userId: string): Promise<void> {
        const transaction = await sequelize.transaction();

        try {
            await this.removeGroupUserUseCase.execute(playersId, userId, groupId, transaction);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getGroupMembers(groupId: number, userId: string): Promise<GroupMemberDTO[]> {
        return await this.getGroupMembersUseCase.execute(groupId, userId);
    }

}
