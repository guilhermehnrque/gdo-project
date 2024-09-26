import { GroupService } from "../../../services/GroupService";
import { LocalService } from "../../../services/LocalService";


export class GroupLocalsUseCase {
    private groupService: GroupService;
    private localService: LocalService;
    private groupLocalsService: GroupLocalsService;

    constructor() {
        this.groupService = new GroupService();
        this.localService = new LocalService();
        this.groupLocalsService = new GroupLocalsService();
    }

    async execute(userId: string, groupId: number, localId: number): Promise<void> {
        const user = await this.getUserData(userId);

        await this.groupService.ensureUserIsOwnerOfGroup(user.id, groupId);

        await this.localService.ensureLocalExists(localId);

        await this.groupLocalsService.registerLocalInGroup(groupId, localId);
    }

    private async getUserData(userId: string) {
        return await this.userService.getUserByUserId(userId);
    }
}