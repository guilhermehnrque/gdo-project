import CustomError from "./CustomError";

export default class InvalidTokenError extends CustomError {
    constructor(
        message: string = "Token inválido para resete de senha", 
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "InvalidTokenError";
    }
}