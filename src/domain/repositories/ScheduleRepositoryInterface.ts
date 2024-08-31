import { ScheduleEntity } from "../entity/ScheduleEntity";
import { Schedule } from "../models/ScheduleModel";

export interface ScheduleRepositoryInterface {
    createSchedule(scheduleEntity: ScheduleEntity): Promise<Schedule | undefined>;
    getScheduleByGroupIdAndDayTime(groupId: number, dayOfWeek: string, startTime: string, endTime: string): Promise<Schedule | null>;
    getScheduleDayOfWeekAndHour(dayOfWeek: string, startTime: string, endTime: string): Promise<Schedule | null | undefined>;
    getAllSchedulesByGroupsId(groupsId: number[]): Promise<Schedule[] | null | undefined>;
    getScheduleGroupId(groupId: number): Promise<Schedule | null | undefined>;
    getScheduleByScheduleIdPkAndGroupIdPk(scheduleId: number, groupId: number): Promise<Schedule | null | undefined>;
    updateSchedule(scheduleEntity: ScheduleEntity): Promise<number | null | undefined>;
}