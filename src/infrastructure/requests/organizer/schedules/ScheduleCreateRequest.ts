export interface ScheduleCreateRequest {
    schedule: {
        dateOfWeek: number;
        startTime: string;
        endTime: string;
    };
}