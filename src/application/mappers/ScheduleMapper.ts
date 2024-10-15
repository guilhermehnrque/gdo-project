import { ScheduleEntity } from "../../domain/entity/ScheduleEntity";
import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleDTO } from "../dto/organizer/schedules/SchedulesDTO";

export function scheduleMapper(schedules: ScheduleEntity[]): Promise<ScheduleDTO[]> {
    return Promise.all(
        schedules.map((schedule: ScheduleEntity) => {
            return ScheduleDTO.fromMapper(schedule);
        })
    );
}

export function scheduleDetailsMapper(schedule: Schedule): Promise<ScheduleDTO> {
    return Promise.resolve(
        ScheduleDTO.fromDetailsMapper(schedule)
    );
}