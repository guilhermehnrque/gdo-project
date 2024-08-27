import { InvitationEntity } from "../entity/InvitationEntity";
import InvitationModel from "../models/InvitationModel";

export interface InvitationRepositoryInterface {
    createInvitation(invitationEntity: InvitationEntity): Promise<boolean>;
    getInvitationByCode(invitationCode: string): Promise<InvitationModel | null>;
    updateInvitationByCode(request: Request): Promise<any>;
    deleteInvitationByCode(request: Request): Promise<any>;
    getInvitationByStatusAndGroupId(status: string, groupId: number, isExpired: boolean): Promise<InvitationModel | null>
}