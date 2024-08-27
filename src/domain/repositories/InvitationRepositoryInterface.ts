import { InvitationEntity } from "../entity/InvitationEntity";
import InvitationModel from "../models/InvitationModel";

export interface InvitationRepositoryInterface {
    createInvitation(invitationEntity: InvitationEntity): Promise<boolean>;
    getInvitationByCodeAndUserId(invitationCode: string, userIdPk: number): Promise<InvitationModel | null>;
    updateInvitationByCode(request: Request): Promise<any>;
    deleteInvitationByCode(request: Request): Promise<any>;
    getInvitationByStatusAndGroupId(status: string, groupId: number, isExpired: boolean): Promise<InvitationModel | null>;
    save(invitation: InvitationModel): Promise<boolean>;
}