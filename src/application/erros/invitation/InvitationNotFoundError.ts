import { CustomError } from "../CustomError";

export default class InvitationNotFoundError extends CustomError {
    constructor(
        message: string = "Convite não encontrado", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvitationNotFoundError";
    }
}