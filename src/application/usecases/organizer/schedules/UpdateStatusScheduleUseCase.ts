import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { ScheduleRepositoryImpl } from "../../../../infrastructure/repositories/ScheduleRepositoryImpl";
import { SchedulesService } from "../../../services/SchedulesService";

export class UpdateStatusScheduleUseCase {

    private scheduleRepository: ScheduleRepositoryImpl;
    private scheduleService: SchedulesService;

    constructor() {
        this.scheduleRepository = new ScheduleRepositoryImpl();
        this.scheduleService = new SchedulesService();
    }

    public async execute(status: boolean, scheduleId: number): Promise<boolean> {
        const schedule = await this.scheduleService.getScheduleById(scheduleId);
        schedule.active = status;
        console.log(schedule.start)
        console.log(schedule.finish.toString())
        
        const scheduleEntity = await ScheduleEntity.fromUpdateUseCase({
            day_of_week: schedule.day_of_week,
            active: schedule.active,
            start: schedule.start,
            finish: schedule.start,
            groups_id: schedule.groups_id,
            scheduling: schedule.scheduling,
            execute_before_days: schedule.execute_before_days,
            execute_in_hour: schedule.execute_in_hour,
            locals_id: schedule.locals_id,
            id: schedule.id,
        });

        return this.update(scheduleEntity);
    }

    private async update(schedule: ScheduleEntity): Promise<boolean> {
        const response = await this.scheduleRepository.updateSchedule(schedule);
        return !!response;
    }
}
