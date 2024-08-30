export interface ScheduleUpdateRequest {
    dateOfWeek: number;
    startTime: string;
    endTime: string;
}

export interface ScheduleUpdateParams {
    scheduleId: number;
    groupId: number;
}