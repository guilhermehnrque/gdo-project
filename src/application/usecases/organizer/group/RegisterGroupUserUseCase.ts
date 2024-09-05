import { Transaction } from "sequelize";
import { GroupsUsers } from "../../../../domain/models/GroupUserModel";
import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import { GroupUsersEmptyError } from "../../../erros/groups/GroupUsersEmptyError";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import logger from "../../../utils/LoggerConfig";


export class RegisterGroupUserUseCase {

    private groupUserRepository: GroupUserRepositoryImpl;
    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(usersId: Array<number>, userId: string, groupId: number, transaction: Transaction): Promise<GroupsUsers[]> {
        const userOrganizer = await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
        const group = await this.groupService.ensureIsOwnerGroupAndReturnGroup(userOrganizer.id, groupId);

        await this.validateIsGroupEmpty(usersId);
        await this.userService.validateArrayOfUsers(usersId)

        const groupUserDTO = new RegisterGroupUserDTO(group.id!, usersId);
        const sanitizedArray = await this.removeMembers(groupUserDTO.getUsersId(), userOrganizer.id);

        return await this.groupUserRepository.createGroupUser(group.id!, sanitizedArray, { transaction });
    }

    async validateIsGroupEmpty(usersArray: Array<number>) {
        if (usersArray.length === 0) {
            logger.error("[RegisterGroupUserUseCase] Array de usuários vazio");
            throw new GroupUsersEmptyError("[RegisterGroupUserUseCase] Usuários devem ser informados");
        }
    }

    async removeMembers(usersArray: Array<number>, userId: number): Promise<Array<number>> {
        return usersArray.filter(user => user !== userId);
    }

}