import { GroupService } from "../../services/GroupService";
import { UserService } from "../../services/UserService";

export class DetailGroupUseCase {

    private userService: UserService;
    private groupService: GroupService;

    constructor() {
        this.userService = new UserService();
        this.groupService = new GroupService();
    }

    public async execute(userId: string, groupIdPk: number): Promise<Object> {
        const user = await this.getUserData(userId);
        const group = await this.getGroupData(groupIdPk);

        return {
            userId: user.id,
            groupId: group.id,
            groupDescription: group.description,
            groupStatus: group.is_active,
            groupVisibility: group.visibility,
            groupLocal: {
                id: group.local?.id,
                city: group.local?.city,
                state: group.local?.state,
                country: group.local?.country,
                zipCode: group.local?.zip_code,
                street: group.local?.street
            }
        };
    }

    async getUserData(userId: string) {
        return await this.userService.getUserByUserId(userId);
    }
    
    async getGroupData(groupIdPk: number) {
        return await this.groupService.getGroupById(groupIdPk);
    }

}