import { GroupDetailsUseCase } from "../../usecases/player/group/GroupDetailsUseCase";
import { GroupsUseCase } from "../../usecases/player/group/GroupsUseCase";

export class PlayersGroupFacade {

    private GroupsUseCase: GroupsUseCase;
    private groupDetailsUseCase: GroupDetailsUseCase;

    constructor() { 
        this.GroupsUseCase = new GroupsUseCase();
        this.groupDetailsUseCase = new GroupDetailsUseCase();
    }

    public async listGroups(userId: string): Promise<Object> {
        return await this.GroupsUseCase.execute(userId);
    }

    public async groupDetail(userId: string, groupIdPk: number): Promise<Object> {
        return await this.groupDetailsUseCase.execute(userId, groupIdPk);
    }

    public async groupList(): Promise<void> {
        try {
            return;
        } catch (error) {
            throw error;
        }
    }

    public async registerGroupList(): Promise<void> {
        try {
            return;
        } catch (error) {
            throw error;
        }
    }

    public async updateGroupListStatus(): Promise<void> {
        try {
            return;
        } catch (error) {
            throw error;
        }
    }

    public async leaveGroup(): Promise<void> {
        try {
            return;
        } catch (error) {
            throw error;
        }
    }


}