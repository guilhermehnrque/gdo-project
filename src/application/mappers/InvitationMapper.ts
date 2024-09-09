import { InvitationEntity } from "../../domain/entity/InvitationEntity";
import { UserEntity } from "../../domain/entity/UserEntity";
import { InvitationDTO } from "../dto/invitation/InvitationDTO";
import { InvitationUserDTO } from "../dto/invitation/InvitationUserDTO";

function mapUserToDTO(invitationUserDTO: InvitationUserDTO): InvitationUserDTO {
    return new InvitationUserDTO(
        invitationUserDTO.name,
        invitationUserDTO.surname,
        invitationUserDTO.email,
        invitationUserDTO.type
    );
}

export function mapInvitationToDTO(invitation: InvitationEntity, invitedUser: UserEntity, invitingUser: UserEntity): InvitationDTO {
    return new InvitationDTO(
        invitation.code!,
        invitation.status!,
        invitation.group_id!,
        invitation.created_at!,
        invitation.expires_at!,
        undefined,
        invitation.id!,
        mapUserToDTO(invitedUser),
        mapUserToDTO(invitingUser),
    );
}