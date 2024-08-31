import CustomError from "../CustomError";

export default class ScheduleNotFoundError extends CustomError {
    constructor(
        message: string = "Nenhum agendamento encontrado", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ScheduleNotFoundError";
    }
}