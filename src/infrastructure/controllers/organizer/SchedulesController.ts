import { Request, Response } from "express";
import CustomError from "../../../application/erros/CustomError";
import { SchedulesFacade } from "../../../application/facade/organizer/SchedulesFacade";
import { ScheduleCreateParams, ScheduleCreateRequest } from "../../requests/organizer/schedules/ScheduleCreateRequest";

export class SchedulesController {

    private scheduleFacade: SchedulesFacade;
    constructor() {
        this.scheduleFacade = new SchedulesFacade();
    }

    public async createSchedule(request: Request, response: Response): Promise<Response> {
        try {
            const body = request.body as ScheduleCreateRequest;
            const params = request.params as unknown as ScheduleCreateParams;

            await this.scheduleFacade.createSchedule(body, params);
            return response.status(201).json({ message: "O horário foi criado" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getScheduleByGroupId(request: Request, response: Response) {
        try {
            return response.status(201).json({ message: "O horário foi criado" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }

    }

    public async updateScheduleById(request: Request, response: Response) {
        try {
            return response.status(201).json({ message: "O horário foi criado" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }

    }

    public async changeStatusScheduleById(request: Request, response: Response) {
        try {
            return response.status(201).json({ message: "O horário foi criado" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }

    }

}