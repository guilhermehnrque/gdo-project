import Group from '../../../../domain/models/GroupModel';
import GroupRepositoryImpl from '../../../../infrastructure/repositories/GroupRepositoryImpl';
import UserRepositoryImpl from '../../../../infrastructure/repositories/UserRepositoryImpl';
import DatabaseError from '../../../erros/DatabaseError';
import { mapGroupToDTO } from '../../../../application/mappers/GroupMapper';
import { GroupDTO } from '../../../dto/group/GroupDTO';


export class GetGroupsUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(userId: string): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        const user = await this.getUserByUserId(userId);

        try {
            const groups = await this.groupRepository.getUserGroupsByUserId(user?.id!);
            const groupDTO =  await this.createGroupDTO(groups);
            return this.categorizeGroupsByStatus(groupDTO);
        } catch (error) {
            const { message } = error as Error;
            throw new DatabaseError(`Failed to get groups: ${message}`);
        }
    }

    async createGroupDTO(groups: Group[]): Promise<GroupDTO[]> {
        return await Promise.all(groups.map(mapGroupToDTO));
    }

    async categorizeGroupsByStatus(groupsDTO: GroupDTO[]): Promise<{ active: GroupDTO[], inactive: GroupDTO[] }> {
        const groupsWithStatus = groupsDTO.reduce((acc: { active: GroupDTO[], inactive: GroupDTO[] }, group: GroupDTO) => {
            if (group.is_active) {
                acc.active.push(group);
            } else {
                acc.inactive.push(group);
            }
            return acc;
        }, { active: [], inactive: [] });
    
        return groupsWithStatus;
    }

    async getUserByUserId(userId: string) {
        return await this.userRepository.getUserByUserId(userId);
    }
}