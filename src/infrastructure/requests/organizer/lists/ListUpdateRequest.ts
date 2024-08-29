export interface ListUpdateRequest {
    status: boolean;
    description: string;
    scheduledDaysBefore: number;
    scheduledHourRelease: string;
}