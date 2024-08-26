import CustomError from "../CustomError";

export default class InvitationPendingError extends CustomError {
    constructor(
        message: string = "Você já tem um convite pendente para este grupo", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvitationPendingError";
    }
}