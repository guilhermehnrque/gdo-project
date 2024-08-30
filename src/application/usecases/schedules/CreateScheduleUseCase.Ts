import { ScheduleEntity } from "../../../domain/entity/ScheduleEntity";
import { ScheduleRepositoryImpl } from "../../../infrastructure/repositories/ScheduleRepositoryImpl";
import { SchedulesService } from "../../services/SchedulesService";

export class CreateScheduleUseCase {

    private scheduleRepository: ScheduleRepositoryImpl;
    private scheduleService: SchedulesService;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
        this.scheduleService = new SchedulesService();
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

        await this.validations(groupId, dayOfWeek, startTime, endTime);

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

        return this.save(schedule);
    }

    private async validations(groupId: number, dayOfWeek: string, startTime: string, endTime: string) {
        await this.scheduleService.checkGroupScheduleConflict(groupId, dayOfWeek, startTime, endTime);
        await this.scheduleService.verifyGroupSchedule(dayOfWeek, startTime, endTime);
    }

    private async save(schedule: ScheduleEntity) {
        const response = await this.scheduleRepository.createSchedule(schedule);

        if (!response || response === undefined) {
            return false;
        }

        return true;
    }
}
