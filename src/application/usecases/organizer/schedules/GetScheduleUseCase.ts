import { GroupService } from "../../../services/GroupService";
import { SchedulesService } from "../../../services/SchedulesService";
import { ScheduleDTO } from "../../../../application/dto/organizer/schedules/SchedulesDTO";
import { UserService } from "../../../services/UserService";
import { scheduleMapper } from "../../../mappers/ScheduleMapper";

export class GetScheduleUseCase {

    private userService: UserService;
    private groupService: GroupService;
    private scheduleService: SchedulesService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
        this.scheduleService = new SchedulesService();
    }

    public async execute(organizerId: string, groupId: number): Promise<ScheduleDTO> {
        const user = await this.userService.getUserById(organizerId);
        const group = await this.groupService.getGroupOwnerByUserIdPk(user!.id, groupId);

        const groupsSchedules = await this.scheduleService.getScheduleByGroupId(group.id);

        return await scheduleMapper(groupsSchedules);
    }

}