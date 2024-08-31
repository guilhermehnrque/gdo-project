import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleRepositoryImpl } from "../../../../infrastructure/repositories/ScheduleRepositoryImpl";
import { LocalService } from "../../../services/LocalService";
import { SchedulesService } from "../../../services/SchedulesService";

export class UpdateScheduleUseCase {

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
        scheduleId: number
    ): Promise<boolean> {
        const registerStatus = true;
        let execBeforeDays = executeBeforeDays;
        let execInHour = executeInHour;

        if (!isSchedulingActive) {
            execBeforeDays = null;
            execInHour = null;
        }

        await this.validations(groupId, dayOfWeek, startTime, endTime, localId);

        const scheduleEntity = await ScheduleEntity.fromUpdateUseCase({
            day_of_week: dayOfWeek,
            active: registerStatus,
            start: startTime,
            finish: endTime,
            groups_id: groupId,
            scheduling: isSchedulingActive,
            execute_before_days: execBeforeDays,
            execute_in_hour: execInHour,
            locals_id: localId,
            id: scheduleId,
        });


        return this.update(scheduleEntity);
    }

    private async validations(groupId: number, dayOfWeek: string, startTime: string, endTime: string, localId: number) {
        await this.checkGroupScheduleConflicts(dayOfWeek, startTime, endTime, groupId);
        await this.localService.ensureLocalDoesNotExist(localId);
    }

    private async checkGroupScheduleConflicts(dayOfWeek: string, startTime: string, endTime: string, groupIdPk: number): Promise<void> {
        const groupSchedule = await this.scheduleRepository.getScheduleDayOfWeekAndHour(dayOfWeek, startTime, endTime);

        if (groupSchedule && groupSchedule.groups_id !== groupIdPk) {
            return;
        }

        await this.scheduleService.checkGroupScheduleConflict(dayOfWeek, startTime, endTime);
    }

    private async update(schedule: ScheduleEntity): Promise<boolean> {
        const response = await this.scheduleRepository.updateSchedule(schedule);
        return !!response;
    }
}
