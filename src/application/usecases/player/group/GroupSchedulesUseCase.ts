import { ScheduleEntity } from "../../../../domain/entity/ScheduleEntity";
import { SchedulesService } from "../../../services/SchedulesService";

export class GroupSchedulesUseCase {

    private scheduleService: SchedulesService;

    constructor() {
        this.scheduleService = new SchedulesService();
    }

    async execute(groupId: number) {
        const schedule = await this.scheduleService.getAllSchedulesByGroupsId([groupId]);

        return await this.prepareOutput(schedule);
    }

    private async prepareOutput(scheduleData: ScheduleEntity[]) {
        return scheduleData.map(schedule => {
            return {
                scheduleId: schedule.id,
                dayOfWeek: schedule.day_of_week,
                startingTime: schedule.start,
                endingTime: schedule.finish,
                dayOfListRelease: this.getDayOfListRelease(schedule.execute_before_days ? schedule.execute_before_days : 0)
            }
        });
    }

    private getDayOfListRelease(beforeDays: number) {
        const today = new Date();
        return today.getDay() - beforeDays;
    }

}