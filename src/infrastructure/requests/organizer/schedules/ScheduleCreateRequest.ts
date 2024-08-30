export interface ScheduleCreateRequest {

    groupId: number;

    schedule: {
        dayOfWeek: string;
        startTime: string;
        endTime: string;
    };

    scheduling: {
        isSchedulingActive: boolean;
        executeBeforeDays: number;
        executeInHour: string;
    }
}