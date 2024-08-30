import { getDayOfWeekByString } from "../enums/DayOfWeekEnum";

export class ScheduleEntity {
    id?: number;
    day_of_week: string;
    active: boolean;
    start: string;
    finish: string;
    groups_id: number;
    created_at: Date;
    updated_at?: Date;
    scheduling: boolean;
    execute_before_days?: number | null;
    execute_in_hour?: string | null;

    constructor(
        dayOfWeek: string,
        active: boolean,
        start: string,
        finish: string,
        group_id: number,
        scheduling: boolean,
        executeBeforeDays?: number | null,
        executeInHour?: string | null,
        id?: number,
    ) {
        this.day_of_week = this.dayOfWeekByString(dayOfWeek);
        this.active = active;
        this.start = start;
        this.finish = finish;
        this.groups_id = group_id;
        this.scheduling = scheduling;
        this.execute_before_days = executeBeforeDays ?? null;
        this.execute_in_hour = executeInHour ?? null;
        this.created_at = new Date();
        this.updated_at = new Date();

        this.validations();
        this.start = this.addSecondsToHour(this.start);
        this.finish = this.addSecondsToHour(this.finish);
    }

    static async fromRepository(
        dayOfWeek: string,
        active: boolean,
        start: string,
        finish: string,
        group_id: number,
        scheduling: boolean,
        executeBeforeDays: number | null,
        executeInHour: string | null,
    ): Promise<ScheduleEntity> {
        return new ScheduleEntity(
            dayOfWeek,
            active,
            start,
            finish,
            group_id,
            scheduling,
            executeBeforeDays,
            executeInHour,
        );
    }

    public validations(): void {
        const validateHour = this.validateIfHourString(this.start) && this.validateIfHourString(this.finish);

        if (!validateHour) {
            throw new Error('Invalid hour format');
        }
    }

    private dayOfWeekByString(dayOfWeek: string): string {
        return getDayOfWeekByString(dayOfWeek)!.toString().toUpperCase();
    }

    private validateIfHourString(hour: string): boolean {
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return regex.test(hour);
    }

    private addSecondsToHour(hour: string): string {
        if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
            return hour;
        }

        return `${hour}:00`;
    }

}