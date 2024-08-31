export interface UpdateSchedulePayload {
    groupId: number;
    localId: number;

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

    scheduleId: number;
}