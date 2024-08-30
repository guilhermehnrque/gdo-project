export interface ScheduleCreateRequest {
    schedule: {
        dayOfWeek: string;
        startTime: string;
        endTime: string;
    };

    schedling: {
        scheduling: boolean;
        executeBeforeDays: number;
        executeInHour: string;
    }
}

export interface ScheduleCreateParams {
    groupId: number;
}