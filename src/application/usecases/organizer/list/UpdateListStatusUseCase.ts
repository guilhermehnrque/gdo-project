import { ListRepositoryImpl } from "../../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";

export class UpdateListStatusUseCase {

    private listRepository: ListRepositoryImpl;
    private listService: ListService;

    constructor() {
        this.listRepository = new ListRepositoryImpl();
        this.listService = new ListService();
    }

    public async execute(listIdPk: number, status: boolean): Promise<number> {
        const list = await this.listService.getListById(listIdPk);
        
        return await this.listRepository.updateListStatus(list?.id!, status);
    }
}