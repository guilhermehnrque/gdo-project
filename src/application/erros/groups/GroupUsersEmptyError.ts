import { CustomError } from "../CustomError";

export class GroupUsersEmptyError extends CustomError {
    constructor(
        message: string = "Grupo não informado no corpo",
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "GroupUsersEmptyError";
    }
}