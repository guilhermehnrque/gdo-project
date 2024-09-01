import { ListRepositoryImpl } from "../../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";

export class GetListDetailsUseCase {

    private listRepository: ListRepositoryImpl;
    private listService: ListService;

    constructor() {
        this.listRepository = new ListRepositoryImpl();
        this.listService = new ListService();
    }

    public async execute(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}