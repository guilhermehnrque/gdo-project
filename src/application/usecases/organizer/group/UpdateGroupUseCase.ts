import GroupEntity from '../../../../domain/entity/GroupEntity';
import logger from '../../../../infrastructure/configs/LoggerConfig';
import GroupRepositoryImpl from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import UserRepositoryImpl from '../../../../infrastructure/repositories/UserRepositoryImpl';
import GroupNotFoundError from '../../../erros/groups/GroupNotFoundError';

export class UpdateGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(groupId: number, userId: string, description: string, status: boolean): Promise<number> {
        const user = await this.getUserByUserId(userId);
        const group = await this.getUserGroup(user?.id!, groupId);

        const groupEntity = await GroupEntity.createFromPayloadUpdate(group.id, user?.id!, description, status);
        return this.groupRepository.updateGroupById(groupEntity);
    }

    async getUserByUserId(userId: string) {
        return await this.userRepository.getUserByUserId(userId);
    }

    async getUserGroup(userId: number, groupId: number) {
        const group = await this.groupRepository.getOwnerGroupByIdAndUserId(groupId, userId);

        if (group == null) {
            logger.warn(`Group with id ${groupId} not found`);
            throw new GroupNotFoundError();
        }

        return group;
    }

}