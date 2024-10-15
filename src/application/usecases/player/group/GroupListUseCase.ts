import { ListEntity } from "../../../../domain/entity/organizer/ListEntity";
import { ListService } from "../../../services/organizer/ListService";
import { SchedulesService } from "../../../services/SchedulesService";


export class GroupListUseCase { 

    private listService: ListService;
    private schedulesService: SchedulesService;

    constructor() {
        this.listService = new ListService();
        this.schedulesService = new SchedulesService();
    }

    async execute(groupId: number) {
        const list = await this.listService.getListsByGroupsIds([groupId]);

        return await this.prepareOutput(list);
    }

    private async prepareOutput(listData: ListEntity[]) {
        return listData.map(list => {
            return {
                listId: list.id,
                description: list.description,
                status: list.status,
                schedule: this.getScheduleOfList(list.schedules_id)
            }
        });
    }

    private async getScheduleOfList(scheduleId: number) {
        const schedule = await this.schedulesService.getScheduleById(scheduleId);

        return {
            scheduleId: schedule.id,
            dayOfWeek: schedule.day_of_week,
            startTime: schedule.start,
            endTime: schedule.finish
        }
    }
}