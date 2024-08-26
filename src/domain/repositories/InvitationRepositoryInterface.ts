import { InvitationEntity } from "../entity/InvitationEntity";

export interface InvitationRepositoryInterface {
    createInvitation(invitationEntity: InvitationEntity): Promise<boolean>;
    getInvitationByCode(request: Request): Promise<any>;
    updateInvitationByCode(request: Request): Promise<any>;
    deleteInvitationByCode(request: Request): Promise<any>;
}