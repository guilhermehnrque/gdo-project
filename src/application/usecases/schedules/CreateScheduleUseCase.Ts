import { ScheduleEntity } from "../../../domain/entity/ScheduleEntity";
import { ScheduleRepositoryImpl } from "../../../infrastructure/repositories/ScheduleRepositoryImpl";

export class CreateScheduleUseCase {

    private scheduleRepository: ScheduleRepositoryImpl;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
    }

    public async execute(
        dayOfWeek: string,
        startTime: string,
        endTime: string,
        groupId: number,
        isSchedulingActive: boolean,
        executeBeforeDays: number | null,
        executeInHour: string | null,
    ): Promise<boolean> {
        const registerStatus = true;
        let execBeforeDays = executeBeforeDays;
        let execInHour = executeInHour;

        if (!isSchedulingActive) {
            execBeforeDays = null;
            execInHour = null;
        }

        const schedule = await ScheduleEntity.fromRepository(
            dayOfWeek,
            registerStatus,
            startTime,
            endTime,
            groupId,
            isSchedulingActive,
            execBeforeDays,
            execInHour,
        );

        const response = await this.scheduleRepository.createSchedule(schedule);

        if (!response || response === undefined) {
            return false;
        }

        return true;
    }


}
