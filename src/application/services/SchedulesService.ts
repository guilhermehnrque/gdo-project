import { Schedule } from "../../domain/models/ScheduleModel";
import logger from "../utils/LoggerConfig";
import { ScheduleRepositoryImpl } from "../../infrastructure/repositories/ScheduleRepositoryImpl";
import ScheduleAlreadyExistsError from "../erros/schedules/ScheduleAlreadyExistsError";
import ScheduleNotFoundError from "../erros/schedules/ScheduleNotFoundError";
import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";

export class SchedulesService {

    private scheduleRepository: ScheduleRepositoryImpl;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
    }

    async getScheduleById(scheduleId: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.getScheduleById(scheduleId);

        if (!schedule) {
            logger.error(`[SchedulesService] getScheduleById: Schedule not found -> ${scheduleId}`);
            throw new ScheduleNotFoundError();
        }

        return schedule;
    }

    async checkGroupScheduleConflict(dayOfWeek: string, startTime: string, endTime: string): Promise<void> {
        const hasSchedule = await this.scheduleRepository.getScheduleDayOfWeekAndHour(dayOfWeek, startTime, endTime);

        if (hasSchedule) {
            logger.error(`[SchedulesService] verifyGroupSchedule: Schedule already exists -> ${dayOfWeek} ${startTime} ${endTime}`);
            throw new ScheduleAlreadyExistsError();
        }
    }

    async getAllSchedulesByGroupsId(groupsId: number[]): Promise<ScheduleEntity[]> {
        const schedules = await this.scheduleRepository.getAllSchedulesByGroupsId(groupsId);

        if (!schedules) {
            logger.error(`[SchedulesService] getAllSchedulesByGroupsId: Schedules not found -> ${groupsId}`);
            throw new ScheduleNotFoundError();
        }

        return this.createListOfEntities(schedules);
    }

    async getScheduleByGroupId(groupId: number): Promise<ScheduleEntity> {
        const schedule = await this.scheduleRepository.getScheduleGroupId(groupId);

        if (!schedule) {
            logger.error(`[SchedulesService] getScheduleByGroupId: Schedule not found -> ${groupId}`);
            throw new ScheduleNotFoundError();
        }

        return this.createEntity(schedule);
    }

    async getScheduleByScheduleIdPkAndGroupIdPk(scheduleId: number, groupId: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.getScheduleByScheduleIdPkAndGroupIdPk(scheduleId, groupId);

        if (!schedule) {
            logger.error(`[SchedulesService] getScheduleByScheduleIdPkAndGroupIdPk: Schedule not found -> ${scheduleId}`);
            throw new ScheduleNotFoundError();
        }

        return schedule;
    }

    async createEntity(schedule: Schedule): Promise<ScheduleEntity> {
        return await ScheduleEntity.fromUseCase({
            day_of_week: schedule.day_of_week,
            active: schedule.active,
            start: schedule.start,
            finish: schedule.finish,
            groups_id: schedule.groups_id,
            scheduling: schedule.scheduling,
            execute_before_days: schedule.execute_before_days,
            execute_in_hour: schedule.execute_in_hour,
            locals_id: schedule.locals_id,
            id: schedule.id
        });
    }

    async createListOfEntities(schedules: Schedule[]): Promise<ScheduleEntity[]> {
        return await Promise.all(schedules.map(async schedule => {
            return await this.createEntity(schedule);
        }));
    }

}