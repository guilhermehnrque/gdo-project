import { Group } from "../../domain/models/GroupModel";
import { GroupRepositoryImpl } from "../../infrastructure/repositories/GroupRepositoryImpl";
import { GroupNotFoundError } from "../erros/groups/GroupNotFoundError";
import { GroupEntity } from "../../domain/entity/GroupEntity";
import logger from "../utils/LoggerConfig";


export class GroupService {

    private groupRepository: GroupRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
    }

    async getGroupOwnerByUserIdPk(userIdPk: number, groupIdPk: number): Promise<Group> {
        const group = await this.groupRepository.getOwnerGroupByIdAndUserId(groupIdPk, userIdPk);

        if (!group) {
            logger.error(`[GroupService] Grupo não encontrado -> userIdPk: ${userIdPk}`);
            throw new GroupNotFoundError('[GroupService] Grupo não encontrado');
        }

        return group;
    }

    async getOrganizerGroupsByUserIdPk(userIdPk: number): Promise<Group[]> {
        const groups = await this.groupRepository.getUserGroupsByUserId(userIdPk);

        if (!groups) {
            logger.error(`[GroupService] Grupos não encontrados -> userIdPk: ${userIdPk}`);
            throw new GroupNotFoundError('[GroupService] Grupos não encontrados');
        }

        return groups;
    }

    async getGroupByDescription(description: string): Promise<Group | null> {
        return await this.groupRepository.getGroupByDescription(description);
    }

    async ensureIsOwnerGroupAndReturnGroup(userIdPk: number, groupIdPk: number): Promise<GroupEntity> {
        const group = await this.getGroupOwnerByUserIdPk(userIdPk, groupIdPk);

        if (!group) {
            logger.error(`[GroupService] Usuário não é dono do grupo -> userIdPk: ${userIdPk} -> groupIdPk: ${groupIdPk}`);
            throw new GroupNotFoundError('[GroupService] Usuário não é dono do grupo');
        }

        return await GroupEntity.fromUseCase(group);
    }

    async validateIfGroupExists(group: Group | null): Promise<void> {
        if (group) {
            logger.error(`[GroupService] Grupo já registrado -> description: ${group.description}`);
            throw new GroupNotFoundError('[GroupService] Grupo já registrado');
        }
    }

    async validateIfAlreadyExistsAndGetGroupByDescription(description: string): Promise<GroupEntity | null> {
        const group = await this.getGroupByDescription(description);
        await this.validateIfGroupExists(group);

        return await GroupEntity.fromUseCase(group!);
    }


}