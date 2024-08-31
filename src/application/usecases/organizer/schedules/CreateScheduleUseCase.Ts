import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleRepositoryImpl } from "../../../../infrastructure/repositories/ScheduleRepositoryImpl";
import { LocalService } from "../../../services/LocalService";
import { SchedulesService } from "../../../services/SchedulesService";

export class CreateScheduleUseCase {

    private scheduleRepository: ScheduleRepositoryImpl;
    private scheduleService: SchedulesService;
    private localService: LocalService;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
        this.scheduleService = new SchedulesService();
        this.localService = new LocalService();
    }

    public async execute(
        dayOfWeek: string,
        startTime: string,
        endTime: string,
        groupId: number,
        localId: number,
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

        await this.validations(groupId, dayOfWeek, startTime, endTime, localId);
        
        const schedule = await ScheduleEntity.fromUseCase({
            day_of_week: dayOfWeek,
            active: registerStatus,
            start: startTime,
            finish: endTime,
            groups_id: groupId,
            scheduling: isSchedulingActive,
            execute_before_days: execBeforeDays,
            execute_in_hour: execInHour,
            locals_id: localId,
        });
        

        return this.save(schedule);
    }

    private async validations(groupId: number, dayOfWeek: string, startTime: string, endTime: string, localId: number) {
        await this.scheduleService.checkGroupScheduleConflict(dayOfWeek, startTime, endTime);
        await this.localService.ensureLocalDoesNotExist(localId);
    }

    private async save(schedule: ScheduleEntity) {
        const response = await this.scheduleRepository.createSchedule(schedule);

        if (!response || response === undefined) {
            return false;
        }

        return true;
    }
}
