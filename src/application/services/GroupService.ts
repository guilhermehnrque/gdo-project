import { Group } from "../../domain/models/GroupModel";
import logger from "../utils/LoggerConfig";
import GroupRepositoryImpl from "../../infrastructure/repositories/GroupRepositoryImpl";
import GroupNotFoundError from "../erros/groups/GroupNotFoundError";

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

}