import { ScheduleEntity } from "../entity/ScheduleEntity";
import { Schedule } from "../models/ScheduleModel";

export interface ScheduleRepositoryInterface {
    createSchedule(scheduleEntity: ScheduleEntity): Promise<Schedule | undefined>;
}