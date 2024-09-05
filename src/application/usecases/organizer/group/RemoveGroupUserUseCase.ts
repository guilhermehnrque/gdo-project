import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { UserEntity } from "../../../../domain/entity/UserEntity";
import { GroupEntity } from "../../../../domain/entity/GroupEntity";

export class RemoveGroupUserUseCase {

    private groupUserRepository: GroupUserRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(usersId: Array<number>, userId: string, groupId: number, transaction: any): Promise<number> {
        const user = await this.stepValidateOrganizer(userId);
        const group = await this.stepValidateAndGetGroupAndUser(groupId, user.id);

        await this.stepValidateGroupAndUsers(usersId);

        const groupUserDTO = new RegisterGroupUserDTO(group.id!, usersId);
        const sanitizedArray = await this.removeMembers(groupUserDTO.getUsersId(), user.id);

        return await this.groupUserRepository.removeGroupUser(group.id!, sanitizedArray, { transaction });
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepValidateAndGetGroupAndUser(groupId: number, userIdPk: number): Promise<GroupEntity> {
        return await this.groupService.ensureIsOwnerGroupAndReturnGroup(groupId, userIdPk)
    }

    async stepValidateGroupAndUsers(usersId: Array<number>): Promise<void> {
        await this.userService.validateArrayOfUsers(usersId);
    }

    async removeMembers(usersArray: Array<number>, userId: number): Promise<Array<number>> {
        return usersArray.filter(user => user !== userId);
    }
}