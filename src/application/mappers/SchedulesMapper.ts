import { Schedule } from "../../domain/models/ScheduleModel";
import { ScheduleDTO } from "../dto/organizer/schedules/SchedulesDTO";

export function schedulesMapper(schedules: Schedule[]): Promise<ScheduleDTO[]> {
    return Promise.resolve(
        schedules.map((schedule: Schedule) => {
            return new ScheduleDTO({
                dayOfWeek: schedule.day_of_week,
                active: schedule.active,
                startTime: schedule.start,
                endTime: schedule.finish,
                schedulingStatus: schedule.scheduling,
                executeBeforeDays: schedule.execute_before_days,
                executeInHour: schedule.execute_in_hour,
                group: {
                    description: schedule.group!.description,
                    isActive: schedule.group!.is_active,
                    createdAt: schedule.group!.created_at,
                    updatedAt: schedule.group!.updated_at,
                },
                local: {
                    description: schedule.local!.description,
                    state: schedule.local!.state,
                    city: schedule.local!.city,
                    street: schedule.local!.street,
                    number: schedule.local!.number,
                    zipCode: schedule.local!.zip_code,
                    createdAt: schedule.local!.created_at,
                    updatedAt: schedule.local!.updated_at
                },
                createdAt: schedule.createdAt,
                updatedAt: schedule.updatedAt,
            });
        })
    );
}