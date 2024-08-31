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
                }],
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getAllSchedulesByGroupsId");
        }
    }

    async getScheduleGroupId(groupId: number): Promise<ScheduleModel | null | undefined> {
        try {
            return await ScheduleModel.findOne({
                where: {
                    groups_id: groupId
                },
                include: [{
                    model: Group,
                    as: 'group'
                },
                {
                    model: Local,
                    as: 'local'

                }]
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getScheduleGroupId");
        }
    }

    async getScheduleByScheduleIdPkAndGroupIdPk(scheduleId: number, groupId: number): Promise<ScheduleModel | null | undefined> {
        try {
            return await ScheduleModel.findOne({
                where: {
                    id: scheduleId,
                    groups_id: groupId
                },
                include: [{
                    model: Group,
                    as: 'group'
                },
                {
                    model: Local,
                    as: 'local'
                }]
            });
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getScheduleByScheduleIdPkAndGroupIdPk");
        }
    }

    async updateSchedule(scheduleEntity: ScheduleEntity): Promise<number | null | undefined> {
        const updatePayload = scheduleEntity.updatePayload();
        try {
            const [affectedCount] = await ScheduleModel.update(updatePayload, {
                where: {
                    id: updatePayload.id
                }
            });

            return affectedCount || null;

        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] updateSchedule");
        }
    }

    async getScheduleById(scheduleId: number): Promise<ScheduleModel | null | undefined> {
        try {
            return await ScheduleModel.findByPk(scheduleId);
        } catch (error) {
            const err = error as CustomError;
            this.logAndThrowError(err, "[ScheduleRepositoryImpl] getScheduleById");
        }
    }

    logAndThrowError(error: CustomError, context: string): void {
        logger.error(`${context} error message -> ${error.message}`);
        throw new Error(`${context} Database error`);
    }
}