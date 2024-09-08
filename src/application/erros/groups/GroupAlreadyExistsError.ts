import { CustomError } from "../CustomError";

export default class GroupAlreadyExistsError extends CustomError {
    constructor(
        message: string = "Grupo já registrado",
        public statusCode: number = 422
    ) {
        super(message, statusCode);
        this.name = "GroupAlreadyExistsError";
    }
}