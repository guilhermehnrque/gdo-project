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
    locals_id?: number | null;

    constructor(payload: Partial<ScheduleEntity>) {
        this.day_of_week = this.dayOfWeekByString(payload.day_of_week!);
        this.active = payload.active!;
        this.start = payload.start!;
        this.finish = payload.finish!;
        this.groups_id = payload.groups_id!;
        this.scheduling = payload.scheduling!;
        this.execute_before_days = payload.execute_before_days ?? null;
        this.execute_in_hour = payload.execute_in_hour ?? null;
        this.created_at = payload.created_at ?? new Date();
        this.updated_at = payload.updated_at ?? new Date();
        this.locals_id = payload.locals_id ?? null;
        this.id = payload.id;

        this.start = this.addSecondsToHour(this.start);
        this.finish = this.addSecondsToHour(this.finish);

        this.validations();
    }

    static async fromUseCase(payload: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        return new ScheduleEntity({
            ...payload,
            created_at: new Date(),
        });
    }

    static async fromUpdateUseCase(payload: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
        return new ScheduleEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    public validations(): void {
        const validateHour = this.validateTimeFormat(this.start) && this.validateTimeFormat(this.finish);

        if (!validateHour) {
            throw new Error('Invalid hour format');
        }
    }

    private dayOfWeekByString(dayOfWeek: string): string {
        return getDayOfWeekByString(dayOfWeek)!.toString().toUpperCase();
    }

    private validateTimeFormat(hour: string): boolean {
        const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
        return regex.test(hour);
    }

    private addSecondsToHour(hour: string): string {
        if (/^\d{2}:\d{2}:\d{2}$/.test(hour)) {
            return hour;
        }

        return `${hour}:00`;
    }

    updatePayload(): Partial<ScheduleEntity> {
        return {
            id: this.id,
            day_of_week: this.day_of_week,
            active: this.active,
            start: this.start,
            finish: this.finish,
            groups_id: this.groups_id,
            scheduling: this.scheduling,
            execute_before_days: this.execute_before_days,
            execute_in_hour: this.execute_in_hour,
            locals_id: this.locals_id
        };
    }
}
