import sequelize from "../../../infrastructure/database/index";
import { DetailGroupUseCase } from "../../usecases/player/DetailGroupUseCase";
import { ListGroupUseCase } from "../../usecases/player/ListGroupUseCase";

export class PlayersGroupFacade {

    private listGroupUseCase: ListGroupUseCase;
    private detailGroupUseCase: DetailGroupUseCase;

    constructor() { 
        this.listGroupUseCase = new ListGroupUseCase();
        this.detailGroupUseCase = new DetailGroupUseCase();
    }

    public async listGroups(userId: string): Promise<Object> {
        return await this.listGroupUseCase.execute(userId);
    }

    public async groupDetail(userId: string, groupIdPk: number): Promise<Object> {
        return await this.detailGroupUseCase.execute(userId, groupIdPk);
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