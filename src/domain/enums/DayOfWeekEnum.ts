export enum DayOfWeekEnum {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
}

export function validDaysOfWeek(): DayOfWeekEnum[] {
    return [
        DayOfWeekEnum.SUNDAY,
        DayOfWeekEnum.MONDAY,
        DayOfWeekEnum.TUESDAY,
        DayOfWeekEnum.WEDNESDAY,
        DayOfWeekEnum.THURSDAY,
        DayOfWeekEnum.FRIDAY,
        DayOfWeekEnum.SATURDAY
    ];
}

export function getDayOfWeekByString(dayOfWeekAsString: string): DayOfWeekEnum | undefined {
    const dayOfWeekMap: { [key: string]: DayOfWeekEnum } = {
        'sunday': DayOfWeekEnum.SUNDAY,
        'monday': DayOfWeekEnum.MONDAY,
        'tuesday': DayOfWeekEnum.TUESDAY,
        'wednesday': DayOfWeekEnum.WEDNESDAY,
        'thursday': DayOfWeekEnum.THURSDAY,
        'friday': DayOfWeekEnum.FRIDAY,
        'saturday': DayOfWeekEnum.SATURDAY
    };

    return dayOfWeekMap[dayOfWeekAsString.toLowerCase()];
}

export function getDayOfWeekById(dayOfWeekId: number): DayOfWeekEnum | undefined {
    const dayOfWeekMap: { [key: number]: DayOfWeekEnum } = {
        0: DayOfWeekEnum.SUNDAY,
        1: DayOfWeekEnum.MONDAY,
        2: DayOfWeekEnum.TUESDAY,
        3: DayOfWeekEnum.WEDNESDAY,
        4: DayOfWeekEnum.THURSDAY,
        5: DayOfWeekEnum.FRIDAY,
        6: DayOfWeekEnum.SATURDAY
    };

    return dayOfWeekMap[dayOfWeekId];
}