import CustomError from "../../application/erros/CustomError";
import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { Group } from "../../domain/models/GroupModel";
import { Local } from "../../domain/models/LocalModel";
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
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] createSchedule");
        }
    }

    async getScheduleByGroupIdAndDayTime(groupId: number, dayOfWeek: string, startTime: string, endTime: string): Promise<ScheduleModel | null> {
        try {
            return await ScheduleModel.findOne({
                where: {
                    groups_id: groupId,
                    day_of_week: dayOfWeek,
                    start: startTime,
                    finish: endTime
                }
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getScheduleByGroupId");
        }
        return null;
    }

    async getScheduleDayOfWeekAndHour(dayOfWeek: string, startTime: string, endTime: string): Promise<ScheduleModel | null | undefined> {
        try {
            return await ScheduleModel.findOne({
                where: {
                    day_of_week: dayOfWeek,
                    start: startTime,
                    finish: endTime
                }
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getScheduleDayOfWeekAndHour");
        }
    }

    async getAllSchedulesByGroupsId(groupsId: number[]): Promise<ScheduleModel[] | null | undefined> {
        try {
            return await ScheduleModel.findAll({
                where: {
                    groups_id: groupsId
                },
                include: [{
                    model: Group,
                    as: 'group'
                },
                {
                    model: Local,
                    as: 'local'
                }
            ],
            
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getAllSchedulesByGroupsId");
        }
    }

    logAndThrowError(error: CustomError, context: string): void {
        logger.error(`${context} error message -> ${error.message}`);
        throw new Error(`${context} Database error`);
    }
}