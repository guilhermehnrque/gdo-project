import CustomError from "../CustomError";

export default class InvitationAcceptError extends CustomError {
    constructor(
        message: string = "O convite já foi aceito", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvitationAcceptError";
    }
}