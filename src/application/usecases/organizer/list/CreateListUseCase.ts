import { ListEntity } from "../../../../domain/entity/organizer/ListEntity";
import { ListRepositoryImpl } from "../../../../infrastructure/repositories/organizer/ListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";

export class CreateListUseCase {

    private listRepository: ListRepositoryImpl;
    private listService: ListService;

    constructor() {
        this.listRepository = new ListRepositoryImpl();
        this.listService = new ListService();
    }

    public async execute(description: string, status: boolean, scheduleId: number): Promise<void> {
        this.validations(scheduleId);

        const listEntity = new ListEntity({ description, status, schedules_id: scheduleId });

        await this.listRepository.createList(listEntity);
    }

    private async validations(scheduleId: number) {
        await this.listService.checkListConflit(scheduleId);
    }
}