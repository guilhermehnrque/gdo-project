import { Request } from 'express';

interface CreateInvitationRequest extends Request {
    body: {
        invite: {
            user_id: string;
            group_id: number;
        }

    };
}

export default CreateInvitationRequest;