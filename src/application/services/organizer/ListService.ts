import { List } from "../../../domain/models/ListModel";
import { ListRepositoryImpl } from "../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListNotFoundError } from "../../erros/organizer/list/ListErrors";

export class ListService {

    private listRepository: ListRepositoryImpl

    constructor() {
        this.listRepository = new ListRepositoryImpl();
    }

    public async getListById(listId: number): Promise<List | null> {
        const list = await this.listRepository.getList(listId);

        await this.checkExistenceOfList(list!);

        return list;
    }

    public async getListDetail(listId: number): Promise<List | null> {
        const list = await this.listRepository.getListDetail(listId);

        await this.checkExistenceOfList(list!);

        return list
    }

    public async getAllLists(scheduleId: number): Promise<List[]> {
        const lists = await this.listRepository.getLists(scheduleId);

        if (lists.length <= 0) {
            throw new ListNotFoundError();
        }

        return lists;
    }

    public async checkListConflit(schedulesId: number): Promise<List | null> {
        const list = await this.listRepository.getListsByScheduleId(schedulesId);

        await this.checkExistenceOfList(list!);

        return list;
    }

    private async checkExistenceOfList(list: List): Promise<void> {
        if (!list || list === null) {
            throw new ListNotFoundError();
        }
    }

}
