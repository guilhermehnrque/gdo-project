import { Request } from 'express';

export interface CreateInvitationRequest extends Request {
    body: {
        invite: {
            guest_id: string;
            group_id: number;
        }

    };
}
