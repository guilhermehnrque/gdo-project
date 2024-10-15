import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { Schedule } from "../../../../domain/models/ScheduleModel";

export class ScheduleDTO {
    id?: number | null;
    dayOfWeek?: string;
    active?: boolean;
    startTime?: string;
    endTime?: string;
    schedulingStatus?: boolean;
    executeBeforeDays?: number | null;
    executeInHour?: string | null;
    group?: GroupDTO;
    local?: LocalDTO;
    createdAt?: Date;
    updatedAt?: Date | null;

    constructor() {}

    static async fromMapper(schedule: ScheduleEntity) {
        let instance = new ScheduleDTO();
        instance.id = schedule.id;
        instance.dayOfWeek = schedule.day_of_week;
        instance.active = schedule.active;
        instance.startTime = schedule.start;
        instance.endTime = schedule.finish;
        instance.schedulingStatus = schedule.scheduling;
        instance.executeBeforeDays = schedule.execute_before_days!;
        instance.executeInHour = schedule.execute_in_hour!;
        instance.createdAt = schedule.created_at!;
        instance.updatedAt = schedule.updated_at!;

        return instance;
    }

    static async fromDetailsMapper(schedule: Schedule) {
        let instance = new ScheduleDTO();
        instance.id = schedule.id;
        instance.dayOfWeek = schedule.day_of_week;
        instance.active = schedule.active;
        instance.startTime = schedule.start;
        instance.endTime = schedule.finish;
        instance.schedulingStatus = schedule.scheduling;
        instance.executeBeforeDays = schedule.execute_before_days!;
        instance.executeInHour = schedule.execute_in_hour!;
        instance.createdAt = schedule.created_at!;
        instance.updatedAt = schedule.updated_at!;

        instance.group = {
            description: schedule.group!.description,
            isActive: schedule.group!.is_active,
            createdAt: schedule.group!.created_at,
            updatedAt: schedule.group!.updated_at,
        };

        instance.local = {
            description: schedule.local!.description,
            state: schedule.local!.state,
            city: schedule.local!.city,
            street: schedule.local!.street,
            number: schedule.local!.number!,
            zipCode: schedule.local!.zip_code,
            createdAt: schedule.local!.created_at,
            updatedAt: schedule.local!.updated_at,
        };

        return instance;
    }
}

export class LocalDTO {
    description: string;
    state: string;
    city: string;
    street: string;
    number: number | null;
    zipCode: number;
    createdAt: Date;
    updatedAt: Date | null | undefined;

    constructor(data: Partial<LocalDTO>) {
        this.description = data.description!;
        this.state = data.state!;
        this.city = data.city!;
        this.street = data.street!;
        this.number = data.number!;
        this.zipCode = data.zipCode!;
        this.createdAt = data.createdAt!;
        this.updatedAt = data.updatedAt!;
    }
}

export class GroupDTO {
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null | undefined;

    constructor(data: Partial<GroupDTO>) {
        this.description = data.description!;
        this.isActive = data.isActive!;
        this.createdAt = data.createdAt!;
        this.updatedAt = data.updatedAt!;
    }
}
