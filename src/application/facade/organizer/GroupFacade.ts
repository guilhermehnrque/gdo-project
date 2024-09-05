import sequelize from "../../../infrastructure/database/index";
import { getGroupVisibility } from "../../../domain/enums/GroupVisibilityEnum";
import { RegisterUserGroupRequest } from "../../../infrastructure/requests/organizer/group/RegisterUserGroupRequest";
import { UpdateGroupRequest } from "../../../infrastructure/requests/organizer/group/UpdateGroupRequest";
import { CreateGroupDTO } from "../../dto/group/CreateGroupDTO";
import { GroupDTO } from "../../dto/group/GroupDTO";
import GroupMemberDTO from "../../dto/groupMember/GroupMemberDTO";
import { CreateLocalDTO } from "../../dto/local/CreateLocalDTO";
import CreateGroupUseCase from "../../usecases/organizer/group/CreateGroupUseCase";
import { DeleteGroupUseCase } from "../../usecases/organizer/group/DeleteGroupUseCase";
import { GetGroupDetailsUseCase } from "../../usecases/organizer/group/GetGroupDetailsUseCase";
import { GetGroupMembersUseCase } from "../../usecases/organizer/group/GetGroupMembersUseCase";
import { GetGroupsUseCase } from "../../usecases/organizer/group/GetGroupsUseCase";
import { RegisterGroupUserUseCase } from "../../usecases/organizer/group/RegisterGroupUserUseCase";
import { RemoveGroupUserUseCase } from "../../usecases/organizer/group/RemoveGroupUserUseCase";
import { UpdateGroupStatusUseCase } from "../../usecases/organizer/group/UpdateGroupStatusUseCase";
import { UpdateGroupUseCase } from "../../usecases/organizer/group/UpdateGroupUseCase";
import CreateLocalUseCase from "../../usecases/organizer/locals/CreateLocalUseCase";

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

    async createGroup(createGroupDTO: CreateGroupDTO, createLocalDTO: CreateLocalDTO, userId: string): Promise<boolean> {
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

    async getUserGroupsByUserId(request: Request): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        const userId = request.userId as string;
        return await this.getGroupsUseCase.execute(userId);
    }

    async getGroupById(request: Request): Promise<GroupDTO> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);

        return await this.getGroupDetailsUseCase.execute(groupId, userId);
    }

    async updateGroupById(request: Request): Promise<number> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);
        const { description, status, visibility } = request.body as UpdateGroupRequest

        return await this.updateGroupUseCase.execute(groupId, userId, description, status, getGroupVisibility(visibility));
    }

    async changeGroupStatus(request: Request): Promise<number> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);
        const status = request.query.active as unknown as boolean;

        return this.updateGroupStatusUseCase.execute(groupId, userId, status);
    }

    async deleteGroupById(request: Request): Promise<void> {
        const userId = request.userId as string;
        const groupId = parseInt(request.params.groupId);

        this.deleteGroupUseCase.execute(groupId, userId);
    }

    async addUserToGroup(request: Request): Promise<void> {
        const { userId, groupId, req } = this.prepareData(request);

        const transaction = await sequelize.transaction();

        try {
            await this.registerGroupUserUseCase.execute(req.users_id, userId, groupId, null);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }

    async removeUsersFromGroup(request: Request): Promise<void> {
        const { userId, groupId, req } = this.prepareData(request);

        const transaction = await sequelize.transaction();

        try {
            await this.removeGroupUserUseCase.execute(req.users_id, userId, groupId, null);
            transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getGroupMembers(request: Request): Promise<GroupMemberDTO[]> {
        const { userId, groupId } = request.params;

        return await this.getGroupMembersUseCase.execute(parseInt(groupId), userId);
    }

    private prepareData(request: Request) {
        const userId = request.userId as string;
        const req = request.body as RegisterUserGroupRequest;
        const groupId = req.group_id

        return { userId, groupId, req }

    }

}
