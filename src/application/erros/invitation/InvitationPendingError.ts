import { CustomError } from "../CustomError";

export class InvitationPendingError extends CustomError {
    constructor(
        message: string = "O usuário já tem um convite pendente para este grupo", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvitationPendingError";
    }
}