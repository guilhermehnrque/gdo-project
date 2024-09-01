import { newCustomError } from "../CustomError";

export class PlayerAlreadyInListError extends newCustomError {
    constructor(
        message: string = "O jogador já está resgistrado na lista", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerAlreadyInListError";
    }
}


export class PlayerNotFoundInListError extends newCustomError {
    constructor(
        message: string = "O jogador não está na lista", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerNotFoundInListError";
    }
}

export class PlayerListNotFoundError extends newCustomError {
    constructor(
        message: string = "Lista de jogadores não encontrada", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerListNotFoundError";
    }
}