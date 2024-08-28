import { Request } from 'express';

interface CreateInvitationRequest extends Request {
    body: {
        invite: {
            guest_id: string;
            group_id: number;
        }

    };
}

export default CreateInvitationRequest;