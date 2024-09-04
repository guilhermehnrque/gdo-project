import { CustomError } from "../CustomError";

export default class GroupNotFoundError extends CustomError {
    constructor(
        message: string = "Grupo não encontrado",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "GroupNotFoundError";
    }
}