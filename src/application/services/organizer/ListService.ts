import { ListEntity } from "../../../domain/entity/organizer/ListEntity";
import { List } from "../../../domain/models/ListModel";
import { ListRepositoryImpl } from "../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListNotFoundError } from "../../erros/organizer/list/ListErrors";

export class ListService {

    private listRepository: ListRepositoryImpl

    constructor() {
        this.listRepository = new ListRepositoryImpl();
    }

    // TODO: Ajustar nomeclaturas e tipos de retorno
    public async getListById(listId: number): Promise<ListEntity> {
        const list = await this.listRepository.getList(listId);

        await this.checkExistenceOfList(list!);

        return this.mapToEntity(list!);
    }

    public async getListDetail(listId: number): Promise<ListEntity> {
        const list = await this.listRepository.getListDetail(listId);

        await this.checkExistenceOfList(list!);

        return this.mapToEntity(list!)
    }

    public async getAllLists(scheduleId: number[]): Promise<ListEntity[]> {
        const lists = await this.listRepository.getLists(scheduleId);

        if (lists.length <= 0) {
            throw new ListNotFoundError();
        }

        return this.mapListEntity(lists);
    }

    public async getListsByGroupsIds(groupIds: number[]): Promise<ListEntity[]> {
        const lists = await this.listRepository.getListsByGroupsIds(groupIds);

        if (lists.length <= 0) {
            throw new ListNotFoundError();
        }

        return this.mapListEntity(lists);
    }

    public async checkListConflict(schedulesId: number): Promise<void> {
        const list = await this.listRepository.getListsByScheduleId(schedulesId);

        if (list) {
            throw new ListNotFoundError("Já existe uma lista para esse horário");
        }
    }

    public async checkListIsNotActive(listId: number): Promise<void> {
        const list = await this.getListById(listId);

        if (!list.status) {
            throw new Error('A lista está desativada');
        }
    }

    private async checkExistenceOfList(list: List): Promise<void> {
        if (!list || list === null) {
            throw new ListNotFoundError();
        }
    }

    private async mapToEntity(local: List) {
        return new ListEntity(local);
    }

    private async mapListEntity(list: List[]): Promise<ListEntity[]> {
        return list.map(local => new ListEntity(local));
    }

}
