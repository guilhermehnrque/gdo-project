import CustomError from "../CustomError";

export default class UserNotStaffError extends CustomError {
    constructor(
        message: string = "Usuário não permitido para executar essa operação", 
        public statusCode: number = 422
    ) {
        super(message);
        this.name = "UserNotStaffError";
    }
}
