import { User } from "../../domain/models/UserModel";
import GroupMemberDTO from "../dto/groupMember/GroupMemberDTO";


export function mapToGroupMemberDTO(groupMember: User): GroupMemberDTO {
    return new GroupMemberDTO(
        groupMember.name,
        groupMember.surname
    );
}