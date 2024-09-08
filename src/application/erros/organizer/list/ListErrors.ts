import { CustomError } from "../../CustomError";

export class ListNotFoundError extends CustomError {
    constructor(
        message: string = "Lista não encontrada",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListNotFoundError";
    }
}

export class ListAlreadyInProgress extends CustomError {
    constructor(
        message: string = "Lista já está em andamento",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListAlreadyInProgress";
    }
}