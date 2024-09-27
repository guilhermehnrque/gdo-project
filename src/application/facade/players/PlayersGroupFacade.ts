import { GroupDetailsUseCase } from "../../usecases/player/group/GroupDetailsUseCase";
import { GroupLeaveUseCase } from "../../usecases/player/group/GroupLeaveUseCase";
import { GroupListUseCase } from "../../usecases/player/group/GroupListUseCase";
import { GroupRegisterUseCase } from "../../usecases/player/group/GroupRegisterUseCase";
import { GroupSchedulesUseCase } from "../../usecases/player/group/GroupSchedulesUseCase";
import { GroupsUseCase } from "../../usecases/player/group/GroupsUseCase";
import { LeaveListUseCase } from "../../usecases/player/list/LeaveListUseCase";
import { RegisterLisUseCase } from "../../usecases/player/list/RegisterListUseCase";

export class PlayersGroupFacade {

    private GroupsUseCase: GroupsUseCase;
    private groupDetailsUseCase: GroupDetailsUseCase;
    private groupScheduleUseCase: GroupSchedulesUseCase;
    private groupListUseCase: GroupListUseCase;
    private groupRegisterUseCase: GroupRegisterUseCase;
    private groupLeaveUseCase: GroupLeaveUseCase;
    private registerListUseCase: RegisterLisUseCase;
    private leaveListUseCase: LeaveListUseCase;

    constructor() { 
        this.GroupsUseCase = new GroupsUseCase();
        this.groupDetailsUseCase = new GroupDetailsUseCase();
        this.groupScheduleUseCase = new GroupSchedulesUseCase();
        this.groupListUseCase = new GroupListUseCase();
        this.groupRegisterUseCase = new GroupRegisterUseCase();
        this.groupLeaveUseCase = new GroupLeaveUseCase();
        this.registerListUseCase = new RegisterLisUseCase();
        this.leaveListUseCase = new LeaveListUseCase();
    }

    public async listGroups(userId: string): Promise<Object> {
        return await this.GroupsUseCase.execute(userId);
    }

    public async groupDetail(userId: string, groupIdPk: number): Promise<Object> {
        return await this.groupDetailsUseCase.execute(userId, groupIdPk);
    }

    public async groupSchedule(groupIdPk: number): Promise<Object> {
        return await this.groupScheduleUseCase.execute(groupIdPk);
    }

    public async groupList(groupIdPk: number): Promise<Object> {
        return await this.groupListUseCase.execute(groupIdPk);
    }

    public async groupRegister(groupIdPk: number, userId: string): Promise<void> {
        return await this.groupRegisterUseCase.execute(groupIdPk, userId);
    }

    public async groupLeave(groupIdPk: number, userId: string): Promise<void> {
        return await this.groupLeaveUseCase.execute(groupIdPk, userId);
    }

    public async registerGroupList(groupIdPk: number, userId: string): Promise<void> {
        return await this.registerListUseCase.execute(userId, groupIdPk);
    }

    public async leaveGroupList(groupIdPk: number, userId: string): Promise<void> {
        return await this.leaveListUseCase.execute(userId, groupIdPk);
    }

}