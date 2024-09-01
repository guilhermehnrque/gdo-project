import { ListRepositoryImpl } from "../../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";

export class UpdateListUseCase {

    private listRepository: ListRepositoryImpl;
    private listService: ListService;

    constructor() {
        this.listRepository = new ListRepositoryImpl();
        this.listService = new ListService();
    }

    public async execute(listIdPk: number, description: string, status: boolean): Promise<number> {
        const list = await this.listService.getListById(listIdPk);
        list.description = description;
        list.status = status;

        return await this.listRepository.updateList(list);
    }

}