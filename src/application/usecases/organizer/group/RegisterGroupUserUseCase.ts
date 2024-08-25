import Group from "../../../../domain/models/GroupModel";
import GroupsUsers from "../../../../domain/models/GroupUserModel";
import { User } from "../../../../domain/models/UserModel";
import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import UserRepositoryImpl from "../../../../infrastructure/repositories/UserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import GroupNotFoundError from "../../../erros/groups/GroupNotFoundError";

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
        const groupUserDTO = new RegisterGroupUserDTO(group.id, usersId);

        return await this.groupUserRepository.createGroupUser(group.id, groupUserDTO.getUsersId(), { transaction });
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
}