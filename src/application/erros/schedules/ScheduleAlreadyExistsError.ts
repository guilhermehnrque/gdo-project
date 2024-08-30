import CustomError from "../CustomError";

export default class ScheduleAlreadyExistsError extends CustomError {
    constructor(
        message: string = "Já existe um agendado neste dia e horário", 
        public statusCode: number = 400
    ) {
        super(message, statusCode);
        this.name = "ScheduleAlreadyExistsError";
    }
}