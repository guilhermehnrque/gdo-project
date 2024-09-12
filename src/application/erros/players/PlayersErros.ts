import { CustomError } from "../../../application/erros/CustomError";

export class PlayerAlreadyInGroup extends CustomError {
    constructor(
        message: string = "Usuário já está no grupo",
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "PlayerAlreadyInGroup";
    }
}
