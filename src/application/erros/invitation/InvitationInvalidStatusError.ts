import { CustomError } from "../CustomError";

export default class InvitationInvalidStatusError extends CustomError {
    constructor(
        message: string = "Status de convite inválido",	 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "InvitationPendingError";
    }
}