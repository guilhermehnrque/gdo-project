import { mapGroupWithLocalToDTO } from '../../../../application/mappers/GroupMapper';
import { GroupDTO } from '../../../../application/dto/group/GroupDTO';
import { GroupEntity } from "../../../../domain/entity/GroupEntity";
import { UserEntity } from "../../../../domain/entity/UserEntity";
import { GroupService } from "../../../services/GroupService";
import { UserService } from "../../../services/UserService";
import { LocalEntity } from '../../../../domain/entity/LocalEntity';

export class GetGroupDetailsUseCase {

    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    async execute(groupId: number, userId: string): Promise<GroupDTO> {
        const user = await this.stepValidateOrganizer(userId);
        const group = await this.stepValidateOrganizerGroup(user.id, groupId);
        const entity = await LocalEntity.fromService(group.local!);

        return await mapGroupWithLocalToDTO(group, entity);
    }

    async stepValidateOrganizer(userId: string): Promise<UserEntity> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

    async stepValidateOrganizerGroup(groupId: number, userIdPk: number): Promise<GroupEntity> {
        return await this.groupService.ensureIsOwnerGroupAndReturnGroup(groupId, userIdPk);
    }


}
