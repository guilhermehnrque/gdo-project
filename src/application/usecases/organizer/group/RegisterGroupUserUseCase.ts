import Group from "../../../../domain/models/GroupModel";
import GroupsUsers from "../../../../domain/models/GroupUserModel";
import { User } from "../../../../domain/models/UserModel";
import logger from "../../../../infrastructure/configs/LoggerConfig";
import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import UserRepositoryImpl from "../../../../infrastructure/repositories/UserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import GroupNotFoundError from "../../../erros/groups/GroupNotFoundError";
import GroupUsersEmptyError from "../../../erros/groups/GroupUsersEmptyError";
import UserNotFoundError from "../../../erros/UserNotFoundError";

export class RegisterGroupUserUseCase {

    private groupUserRepository: GroupUserRepositoryImpl;
    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(usersId: Array<number>, userId: string, groupId: number, transaction: any): Promise<GroupsUsers[]> {
        const user = await this.getUser(userId);
        const group = await this.validateAndGetGroupAndUser(groupId, user?.id!);

        await this.validateIsGroupEmpty(usersId);
        await this.validateAllUsers(usersId)

        const groupUserDTO = new RegisterGroupUserDTO(group.id, usersId);
        const sanitizedArray = await this.removeMembers(groupUserDTO.getUsersId(), user?.id!);

        return await this.groupUserRepository.createGroupUser(group.id, sanitizedArray, { transaction });
    }

    async validateAndGetGroupAndUser(groupId: number, userId: number): Promise<Group> {
        const group = await this.groupRepository.getGroupById(groupId, userId);

        if (!group) {
            throw new GroupNotFoundError();
        }

        return group;
    }

    async getUser(userId: string): Promise<User | null> {
        return await this.userRepository.getUserByUserId(userId);
    }

    async getUserById(userId: number): Promise<User | null> {
        return await this.userRepository.getUserByPK(userId);
    }

    async validateIsGroupEmpty(usersArray: Array<number>) {
        if(usersArray.length === 0) {
            logger.error("[RegisterGroupUserUseCase] Array de usuários vazio");
            throw new GroupUsersEmptyError("[RegisterGroupUserUseCase] Usuários devem ser informados");
        }
    }
    
    async removeMembers(usersArray: Array<number>, userId: number): Promise<Array<number>> {
        return usersArray.filter(user => user !== userId);
    }

    async validateAllUsers(usersArray: Array<number>) {
        const userValidationPromises = usersArray.map(async user => {
            const usr = await this.getUserById(user);
            if (!usr) {
                logger.error(`[RegisterGroupUserUseCase] Usuário ${user} não inválido`);
                throw new UserNotFoundError(`Usuário ${user} não encontrado`);
            }
        });
    
        await Promise.all(userValidationPromises);
    }
}