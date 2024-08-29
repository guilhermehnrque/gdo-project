import { InvitationEntity } from "../entity/InvitationEntity";
import { Invitation }  from "../models/InvitationModel";

export interface InvitationRepositoryInterface {
    createInvitation(invitationEntity: InvitationEntity): Promise<boolean>;
    getInvitationByCodeAndUserId(invitationCode: string, userIdPk: number): Promise<Invitation | null>;
    updateInvitationByCode(request: Request): Promise<any>;
    deleteInvitationByCode(request: Request): Promise<any>;
    getInvitationByStatusAndGroupId(status: string, groupId: number): Promise<Invitation | null>;
    save(invitation: Invitation): Promise<boolean>;
}