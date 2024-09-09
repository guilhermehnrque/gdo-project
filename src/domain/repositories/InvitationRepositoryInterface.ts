import { InvitationEntity } from "../entity/InvitationEntity";
import { Invitation }  from "../models/InvitationModel";

export interface InvitationRepositoryInterface {
    createInvitation(invitationEntity: InvitationEntity): Promise<boolean>;
    getInvitationByCodeAndUserId(invitationCode: string, userIdPk: number): Promise<Invitation | null>;
    getInvitationByStatusAndGroupId(status: string, groupId: number): Promise<Invitation | null>;
}