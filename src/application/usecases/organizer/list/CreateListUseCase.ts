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
        await this.validations(scheduleId);

        const listEntity = new ListEntity({ description, status, schedules_id: scheduleId, created_at: new Date(), updated_at: new Date() });

        await this.listRepository.createList(listEntity);
    }

    private async validations(scheduleId: number) {
        await this.listService.checkListConflict(scheduleId);
    }
}