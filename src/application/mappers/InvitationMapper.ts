import { Invitation } from "../../domain/models/InvitationModel";
import { User } from "../../domain/models/UserModel";
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

export function mapInvitationToDTO(invitation: Invitation, invitedUser: User, invitingUser: User): InvitationDTO {
    return new InvitationDTO(
        invitation.code,
        invitation.status,
        invitation.groups_id,
        invitation.created_at,
        invitation.expires_at,
        undefined,
        invitation.id,
        mapUserToDTO(invitedUser),
        mapUserToDTO(invitingUser),
    );
}