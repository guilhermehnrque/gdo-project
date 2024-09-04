import { GroupsUsers } from "../../domain/models/GroupUserModel";
import logger from "../utils/LoggerConfig";
import { GroupUserRepositoryImpl } from "../../infrastructure/repositories/GroupUserRepositoryImpl";
import GroupNotFoundError from "../erros/groups/GroupNotFoundError";

export class GroupMemberService {

    private groupUserRepository: GroupUserRepositoryImpl;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
    }

    async getAllGrupoMembersByGroupId(groupIdPk: number): Promise<GroupsUsers[]> {
        const groupMembers = await this.groupUserRepository.getAllGroupMembers(groupIdPk);

        if (!groupMembers) {
            logger.error(`[GroupMemberServce] Membros do grupo não encontrados -> groupId: ${groupIdPk}`);
            throw new GroupNotFoundError('[GroupMemberServce] Membros do grupo não encontrados');
        }

        return groupMembers;
    }

}