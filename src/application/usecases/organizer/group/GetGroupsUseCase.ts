import Group from '../../../../domain/models/GroupModel';
import GroupRepositoryImpl  from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import UserRepositoryImpl from '../../../../infrastructure/repositories/UserRepositoryImpl';
import DatabaseError from '../../../erros/DatabaseError';

export class GetGroupsUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(userId: string): Promise<Group[]> {
        const user = await this.getUserByUserId(userId);

        try {
            return await this.groupRepository.getUserGroupsByUserId(user?.id!);
        } catch (error) {
            const { message } = error as Error; 
            throw new DatabaseError(`Failed to get groups: ${message}`);
        }
    }

    async getUserByUserId(userId: string) {
        return await this.userRepository.getUserByUserId(userId);
    }
}