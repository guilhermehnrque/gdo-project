import { Group } from "../../domain/models/GroupModel";
import logger from "../../infrastructure/configs/LoggerConfig";
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

}