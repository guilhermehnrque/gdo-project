import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleRepositoryImpl } from "../../infrastructure/repositories/ScheduleRepositoryImpl";
import ScheduleAlreadyExistsError from "../erros/schedules/ScheduleAlreadyExistsError";
import ScheduleNotFoundError from "../erros/schedules/ScheduleNotFoundError";

export class SchedulesService {

    private scheduleRepository: ScheduleRepositoryImpl;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
    }

    async checkGroupScheduleConflict(groupId: number, dayOfWeek: string, startTime: string, endTime: string): Promise<void> {
        const hasSchedule = await this.scheduleRepository.getScheduleByGroupIdAndDayTime(groupId, dayOfWeek, startTime, endTime);

        if (hasSchedule) {
            throw new ScheduleAlreadyExistsError();
        }

    }

    async verifyGroupSchedule(dayOfWeek: string, startTime: string, endTime: string): Promise<void> {
        const hasSchedule = await this.scheduleRepository.getScheduleDayOfWeekAndHour(dayOfWeek, startTime, endTime);

        if (hasSchedule) {
            throw new ScheduleAlreadyExistsError();
        }
    }

    async getAllSchedulesByGroupsId(groupsId: number[]): Promise<Schedule[]> {
        const schedules = await this.scheduleRepository.getAllSchedulesByGroupsId(groupsId);

        if (!schedules) {
            throw new ScheduleNotFoundError();
        }

        return schedules;
    }

}