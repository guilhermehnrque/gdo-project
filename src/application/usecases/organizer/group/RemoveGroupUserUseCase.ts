import Group from "../../../../domain/models/GroupModel";
import { User } from "../../../../domain/models/UserModel";
import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import { GroupUserRepositoryImpl } from "../../../../infrastructure/repositories/GroupUserRepositoryImpl";
import UserRepositoryImpl from "../../../../infrastructure/repositories/UserRepositoryImpl";
import { RegisterGroupUserDTO } from "../../../dto/group/RegisterGroupUserDTO";
import GroupNotFoundError from "../../../erros/groups/GroupNotFoundError";

export class RemoveGroupUserUseCase {

    private groupUserRepository: GroupUserRepositoryImpl;
    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(usersId: Array<number>, userId: string, groupId: number, transaction: any): Promise<number> {
        const user = await this.getUser(userId);
        const group = await this.validateAndGetGroupAndUser(groupId, user?.id!);
        const groupUserDTO = new RegisterGroupUserDTO(group.id, usersId);
        const sanitizedArray = await this.removeMembers(groupUserDTO.getUsersId(), user?.id!);

        return await this.groupUserRepository.removeGroupUser(group.id, sanitizedArray, { transaction });
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

    async removeMembers(usersArray: Array<number>, userId: number): Promise<Array<number>> {
        return usersArray.filter(user => user !== userId);
    }

}