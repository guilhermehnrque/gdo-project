import { schedulesMapper } from "../../../mappers/SchedulesMapper";
import { GroupService } from "../../../services/GroupService";
import { SchedulesService } from "../../../services/SchedulesService";
import { ScheduleDTO } from "../../../../application/dto/organizer/schedules/SchedulesDTO";
import { UserService } from "../../../services/UserService";

export class GetSchedulesUseCase {

    private userService: UserService;
    private groupService: GroupService;
    private scheduleService: SchedulesService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.scheduleService = new SchedulesService();
    }

    public async execute(organizerId: string): Promise<ScheduleDTO[]> {
        const user = await this.userService.getUserById(organizerId);
        const groups = await this.groupService.getOrganizerGroupsByUserIdPk(user!.id);

        const groupsId = groups.map(group => group.id);

        const groupsSchedules = await this.scheduleService.getAllSchedulesByGroupsId(groupsId);
        return schedulesMapper(groupsSchedules);
    }

}