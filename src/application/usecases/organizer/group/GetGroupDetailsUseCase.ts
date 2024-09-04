import logger from "../../../utils/LoggerConfig";
import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import { UserRepositoryImpl } from '../../../../infrastructure/repositories/UserRepositoryImpl';
import { mapGroupToDTO } from '../../../../application/mappers/GroupMapper';
import { GroupDTO } from "../../../dto/group/GroupDTO";
import GroupNotFoundError from "../../../erros/groups/GroupNotFoundError";

export class GetGroupDetailsUseCase {
    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(groupId: number, userId: string): Promise<GroupDTO> {
        const user = await this.getUserByUserId(userId);

        const group = await this.groupRepository.getOwnerGroupByIdAndUserId(groupId, user?.id!);

        if (group == null) {
            logger.warn(`Group not found for user ${userId} and group ${groupId}`);
            throw new GroupNotFoundError();
        }

        return mapGroupToDTO(group);
    }

    async getUserByUserId(userId: string) {
        return await this.userRepository.getUserByUserId(userId);
    }

}
