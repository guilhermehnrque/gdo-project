import { Schedule } from "../../domain/models/ScheduleModel";
import logger from "../../infrastructure/configs/LoggerConfig";
import { ScheduleRepositoryImpl } from "../../infrastructure/repositories/ScheduleRepositoryImpl";
import ScheduleAlreadyExistsError from "../erros/schedules/ScheduleAlreadyExistsError";
import ScheduleNotFoundError from "../erros/schedules/ScheduleNotFoundError";

export class SchedulesService {

    private scheduleRepository: ScheduleRepositoryImpl;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
    }

    async checkGroupScheduleConflict(dayOfWeek: string, startTime: string, endTime: string): Promise<void> {
        const hasSchedule = await this.scheduleRepository.getScheduleDayOfWeekAndHour(dayOfWeek, startTime, endTime);

        if (hasSchedule) {
            logger.error(`[SchedulesService] verifyGroupSchedule: Schedule already exists -> ${dayOfWeek} ${startTime} ${endTime}`);
            throw new ScheduleAlreadyExistsError();
        }
    }

    async getAllSchedulesByGroupsId(groupsId: number[]): Promise<Schedule[]> {
        const schedules = await this.scheduleRepository.getAllSchedulesByGroupsId(groupsId);

        if (!schedules) {
            logger.error(`[SchedulesService] getAllSchedulesByGroupsId: Schedules not found -> ${groupsId}`);
            throw new ScheduleNotFoundError();
        }

        return schedules;
    }

    async getScheduleByGroupId(groupId: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.getScheduleGroupId(groupId);

        if (!schedule) {
            logger.error(`[SchedulesService] getScheduleByGroupId: Schedule not found -> ${groupId}`);
            throw new ScheduleNotFoundError();
        }

        return schedule;
    }

    async getScheduleByScheduleIdPkAndGroupIdPk(scheduleId: number, groupId: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.getScheduleByScheduleIdPkAndGroupIdPk(scheduleId, groupId);

        if (!schedule) {
            logger.error(`[SchedulesService] getScheduleByScheduleIdPkAndGroupIdPk: Schedule not found -> ${scheduleId}`);
            throw new ScheduleNotFoundError();
        }

        return schedule;
    }

}