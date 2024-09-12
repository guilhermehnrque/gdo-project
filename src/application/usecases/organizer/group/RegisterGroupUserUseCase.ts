import { Transaction } from "sequelize";
import { GroupsUsers } from "../../../../domain/models/GroupUserModel";
import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import { GroupUsersEmptyError } from "../../../erros/groups/GroupUsersEmptyError";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import logger from "../../../utils/LoggerConfig";
import { GroupsUsersService } from "../../../services/GroupsUsersService";

export class RegisterGroupUserUseCase {

    private groupsUsersService: GroupsUsersService;
    private userService: UserService;
    private groupService: GroupService;
    private groupUserRepository: GroupUserRepositoryImpl;

    constructor() {
        this.groupsUsersService = new GroupsUsersService();
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.groupUserRepository = new GroupUserRepositoryImpl();
    }

    async execute(usersId: Array<number>, userId: string, groupId: number, transaction: Transaction): Promise<GroupsUsers[]> {
        const userOrganizer = await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
        const group = await this.groupService.ensureIsOwnerGroupAndReturnGroup(userOrganizer.id, groupId);

        await this.validations(usersId, group.id!);
        await this.userService.validateArrayOfUsers(usersId)
        await this.groupsUsersService.ensureUserIsNotInGroup(userOrganizer.id, group.id!);

        const groupUserDTO = new RegisterGroupUserDTO(group.id!, usersId);

        return await this.groupUserRepository.createGroupUser(group.id!, groupUserDTO.getUsersId(), { transaction });
    }

    async validations(usersArray: Array<number>, groupId: number): Promise<void> {
        if (usersArray.length === 0) {
            logger.error("[RegisterGroupUserUseCase] validateIsGroupEmpty: Array de usuários vazio");
            throw new GroupUsersEmptyError("Usuários devem ser informados");
        }

        await Promise.all(
            usersArray.map(async userId => {
                await this.groupsUsersService.ensureUserIsNotInGroup(userId, groupId); 
            }
        ))
    }

}