export interface ScheduleUpdateRequest {

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

}
export interface ScheduleUpdateParams {
    scheduleId: number;
}