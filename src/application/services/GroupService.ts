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
            logger.error(`[GroupService] getGroupOwnerByUserIdPk Grupo não encontrado -> userIdPk: ${userIdPk}`);
            throw new GroupNotFoundError('Grupo não encontrado');
        }

        return group;
    }

    async getOrganizerGroupsByUserIdPk(userIdPk: number): Promise<GroupEntity[]> {
        const groups = await this.groupRepository.getUserGroupsByUserId(userIdPk);

        if (!groups || groups.length === 0) {
            logger.error(`[GroupService] getOrganizerGroupsByUserIdPk Grupos não encontrados -> userIdPk: ${userIdPk}`);
            throw new GroupNotFoundError('Grupos não encontrados');
        }

        return await Promise.all(groups.map(group => {
            return GroupEntity.fromService({
                id: group.id,
                description: group.description,
                is_active: group.is_active,
                users_id: group.users_id,
                visibility: group.visibility,
                created_at: group.created_at,
                updated_at: group.updated_at,
                deleted_at: group.deleted_at,
            })
        }));

    }

    async getGroupByDescription(description: string): Promise<Group | null> {
        return await this.groupRepository.getGroupByDescription(description);
    }

    async getGroupById(groupId: number): Promise<GroupEntity> {  
        const group = await this.groupRepository.getGroupById(groupId);

        if (!group) {
            logger.error(`[GroupService] getGroupById Grupo não encontrado -> groupId: ${groupId}`);
            throw new GroupNotFoundError('Grupo não encontrado');
        }

        return await this.prepareEntityWithIdPk(group);
    }

    async ensureIsOwnerGroupAndReturnGroup(userIdPk: number, groupIdPk: number): Promise<GroupEntity> {
        const group = await this.getGroupOwnerByUserIdPk(userIdPk, groupIdPk);

        if (!group) {
            logger.error(`[GroupService] ensureIsOwnerGroupAndReturnGroup Usuário não é dono do grupo -> userIdPk: ${userIdPk} -> groupIdPk: ${groupIdPk}`);
            throw new GroupNotFoundError('Usuário não é dono do grupo');
        }

        return await GroupEntity.fromService({
            id: group.id,
            description: group.description,
            is_active: group.is_active,
            users_id: group.users_id,
            visibility: group.visibility,
            created_at: group.created_at,
            updated_at: group.updated_at,
            deleted_at: group.deleted_at,
            local: group.local
        });
    }

    async validateIfGroupExists(group: Group | null): Promise<void> {
        if (group) {
            logger.error(`[GroupService] validateIfGroupExists group já registrado description: ${group.description}`);
            throw new GroupNotFoundError('Grupo já registrado');
        }
    }

    async validateIfAlreadyExistsAndGetGroupByDescription(description: string): Promise<GroupEntity | null> {
        const group = await this.getGroupByDescription(description);
        await this.validateIfGroupExists(group);

        return await GroupEntity.fromService(group!);
    }

    async prepareEntityWithIdPk(group: Group): Promise<GroupEntity> {
        return new GroupEntity({
            id: group.id,
            description: group.description,
            is_active: group.is_active,
            users_id:   group.users_id,
            visibility: group.visibility,
            created_at: group.created_at,
            updated_at: group.updated_at,
            deleted_at: group.deleted_at
        });
    }

}