import { ListDTO } from "../../dto/organizer/list/ListDTO";
import { ListCreatePayload } from "../../interfaces/payloads/list/ListCreatePayload";
import { ListUpdatePayload } from "../../interfaces/payloads/list/ListUpdatePayload";
import { CreateListUseCase } from "../../usecases/organizer/list/CreateListUseCase";
import { GetListDetailsUseCase } from "../../usecases/organizer/list/GetListDetailsUseCase";
import { GetListsUseCase } from "../../usecases/organizer/list/GetListsUseCase";
import { UpdateListStatusUseCase } from "../../usecases/organizer/list/UpdateListStatusUseCase";
import { UpdateListUseCase } from "../../usecases/organizer/list/UpdateListUseCase";

export class ListFacade {

    private createListUseCase: CreateListUseCase;
    private getListDetailsUseCase: GetListDetailsUseCase;
    private getListsUseCase: GetListsUseCase;
    private updateListUseCase: UpdateListUseCase;
    private updateListStatusUseCase: UpdateListStatusUseCase;

    constructor() {
        this.createListUseCase = new CreateListUseCase();
        this.getListDetailsUseCase = new GetListDetailsUseCase();
        this.getListsUseCase = new GetListsUseCase();
        this.updateListUseCase = new UpdateListUseCase();
        this.updateListStatusUseCase = new UpdateListStatusUseCase();
    }

    public async createList(payload: ListCreatePayload): Promise<void> {
        const { description, status, scheduleId, limitOfPlayers, groupId } = payload
        await this.createListUseCase.execute(description, status, scheduleId, limitOfPlayers, groupId);
    }

    public async updateListById(listId: number, listUpdateRequest: ListUpdatePayload): Promise<number> {
        const { description, status } = listUpdateRequest
        return await this.updateListUseCase.execute(listId, description, status);
    }

    public async updateListStatusById(listId: number, status: boolean): Promise<number> {
       return await this.updateListStatusUseCase.execute(listId, status);
    }

    public async getListById(listId: number): Promise<ListDTO> {
        return await this.getListDetailsUseCase.execute(listId);
    }

    public async getAllListsByOrganizerId(userId: string): Promise<ListDTO[]> {
        return await this.getListsUseCase.execute(userId);
    }
}