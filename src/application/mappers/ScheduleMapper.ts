import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleDTO } from "../dto/organizer/schedules/SchedulesDTO";

export function scheduleMapper(schedules: Schedule[]): Promise<ScheduleDTO[]> {
    return Promise.all(
        schedules.map((schedule: Schedule) => {
            return ScheduleDTO.fromMapper(schedule);
        })
    );
}

export function scheduleDetailsMapper(schedule: Schedule): Promise<ScheduleDTO> {
    return Promise.resolve(
        ScheduleDTO.fromDetailsMapper(schedule)
    );
}