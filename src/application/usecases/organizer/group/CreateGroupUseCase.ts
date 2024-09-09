import { GroupRepositoryImpl } from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import { CreateGroupDTO } from "../../../dto/group/CreateGroupDTO";
import { Transaction } from "sequelize";
import { UserService } from "../../../services/UserService";
import { UserEntity } from "../../../../domain/entity/UserEntity";
import { GroupService } from "../../../services/GroupService";
import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { Group } from "../../../../domain/models/GroupModel";

export class CreateGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(createGroupDTO: CreateGroupDTO, userId: string, transaction: Transaction): Promise<GroupEntity> {
        const user = await this.stepValidateUserAndGroupAndReturnUser(createGroupDTO, userId);

        const groupEntity = await GroupEntity.createFromDTO(createGroupDTO, user.id);
        groupEntity.setStatus(true);

        const createdGroup = await this.createGroup(groupEntity, transaction);
        groupEntity.setId(createdGroup.id!);

        return groupEntity;
    }

    private async stepValidateUserAndGroupAndReturnUser(createGroupDTO: CreateGroupDTO, userId: string): Promise<UserEntity> {
        const user = await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
        await this.groupService.ensureGroupDoesNotExists(createGroupDTO.description)

        return user;
    }

    private async createGroup(groupEntity: GroupEntity, transaction: Transaction): Promise<Group> {
        return await this.groupRepository.createGroup(groupEntity, { transaction });
    }

}
