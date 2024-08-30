
export class CreateScheduleUseCase {
    constructor() {

    }

    public async execute(
        dayOfWeek: string,
        startTime: string,
        endTime: string,
        groupId: number,
        scheduling: boolean,
        executeBeforeDays: number,
        executeInHour: string
    ): Promise<void> {

    }

}
