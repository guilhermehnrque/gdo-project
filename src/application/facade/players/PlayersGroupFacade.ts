import sequelize from "../../../infrastructure/database/index";
import { ListGroupUseCase } from "../../usecases/player/ListGroupUseCase";

export class PlayersGroupFacade {

    private listGroupUseCase: ListGroupUseCase;

    constructor() { 
        this.listGroupUseCase = new ListGroupUseCase();
    }

    public async listGroups(userId: string): Promise<Object> {
        return await this.listGroupUseCase.execute(userId);
    }

    public async groupDetail(): Promise<void> {
        try {
            return;
        } catch (error) {
            throw error;
        }
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