import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { mapListWithDTO } from "../../../mappers/organizer/ListDetailMapper";
import { GroupService } from "../../../services/GroupService";
import { ListService } from "../../../services/organizer/ListService";
import { SchedulesService } from "../../../services/SchedulesService";
import { UserService } from "../../../services/UserService";

export class GetListsUseCase {

    private listService: ListService;
    private scheduleService: SchedulesService;
    private groupService: GroupService;
    private userService: UserService;

    constructor() {
        this.groupService = new GroupService();
        this.scheduleService = new SchedulesService();
        this.listService = new ListService();
        this.userService = new UserService();
    }

    public async execute(userId: string): Promise<ListDTO[]> {
        const user = await this.userService.getUserByUserId(userId);

        const groups = await this.groupService.getOrganizerGroupsByUserIdPk(user!.id);
        const groupsId = await Promise.all(groups.map(async group => group.id!));

        const schedules = await this.scheduleService.getAllSchedulesByGroupsId(groupsId);
        const schedulesId = schedules.map(schedule => schedule.id);

        const lists = await this.listService.getAllLists(schedulesId);

        return await Promise.all(lists.map(list => mapListWithDTO(list)));
    }

}