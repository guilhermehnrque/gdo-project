import { GroupMemberDTO } from "../../../dto/groupMember/GroupMemberDTO";
import { GroupMemberService } from "../../../services/GroupMemberService";
import { mapToGroupMemberDTO } from "../../../mappers/GroupMemberMapper";

export class GetGroupMembersUseCase {

    private groupMemberService: GroupMemberService;

    constructor() {
        this.groupMemberService = new GroupMemberService();
    }

    async execute(groupIdPk: number, userId: string): Promise<GroupMemberDTO[]> {
        const groupMembers = await this.groupMemberService.getAllGrupoMembersByGroupId(groupIdPk);
        const users = await Promise.all(groupMembers.map(groupMember => mapToGroupMemberDTO(groupMember.player!)));
        return users;
    }
}
