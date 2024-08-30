import CustomError from "../../application/erros/CustomError";
import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { Schedule as ScheduleModel } from "../../domain/models/ScheduleModel";
import { ScheduleRepositoryInterface } from "../../domain/repositories/ScheduleRepositoryInterface";
import logger from "../configs/LoggerConfig";

export class ScheduleRepositoryImpl implements ScheduleRepositoryInterface {

    async createSchedule(scheduleEntity: ScheduleEntity): Promise<ScheduleModel | undefined> {
        try {
            const schedule = ScheduleModel.build(scheduleEntity);
            return await schedule.save(); 
        } catch (error) {
            const err = error as CustomError
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] create schedule");
        }
    }

    logAndThrowError(error: CustomError, context: string): void {
        logger.error(`[${context}] error message -> ${error.message}`);
        throw new Error(`[${context}] Database error`);

    }
}