import { newCustomError } from "../../CustomError";

export class ListNotFoundError extends newCustomError {
    constructor(
        message: string = "Lista não encontrada", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListNotFoundError";
    }
}

export class ListAlreadyInProgress extends newCustomError {
    constructor(
        message: string = "Lista já está em andamento", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ListAlreadyInProgress";
    }
}