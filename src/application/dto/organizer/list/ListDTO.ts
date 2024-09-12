class ScheduleDTO {
    id: number | null | undefined;
    day_of_week: string;
    active: boolean;
    start: string;
    end: string;
    scheduling: boolean;
    execute_before_days: number | null;
    execute_in_hour: string | null;
    created_at: Date;
    updated_at: Date | null | undefined;
    groups_id: number;

    constructor(data: Partial<ScheduleDTO>) {
        this.id = data.id;
        this.day_of_week = data.day_of_week!;
        this.active = data.active!;
        this.start = data.start!;
        this.end = data.end!;
        this.scheduling = data.scheduling!;
        this.execute_before_days = data.execute_before_days!;
        this.execute_in_hour = data.execute_in_hour!;
        this.created_at = data.created_at!;
        this.updated_at = data.updated_at;
        this.groups_id = data.groups_id!;
    }

    public toCamelCase() {
        return {
            id: this.id,
            dayOfWeek: this.day_of_week,
            active: this.active,
            startTime: this.start,
            endTime: this.end,
            schedulingStatus: this.scheduling,
            executeBeforeDays: this.execute_before_days,
            executeInHour: this.execute_in_hour,
            createdAt: this.created_at,
            updatedAt: this.updated_at
        };
    }
}

export class ListDTO {
    public id?: number;
    public description: string | null;
    public status: boolean;
    public limit: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public scheduleId: number;
    public groupId: number;

    public schedule: Object | null;

    constructor(data: Partial<ListDTO>) {
        this.description = data.description!;
        this.status = data.status!;
        this.limit = data.limit!;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.id = data.id;
        this.scheduleId = data.scheduleId!;
        this.groupId = data.groupId!
        this.schedule = data.schedule ? new ScheduleDTO(data.schedule).toCamelCase() : null;
    }

    toJSON() {
        const obj: any = { ...this };

        if (obj.schedule === null) {
            delete obj.schedule;
        }
        return obj;
    }

}