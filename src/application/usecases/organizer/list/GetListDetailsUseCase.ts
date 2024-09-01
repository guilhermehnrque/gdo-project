import { ListDTO } from "../../../dto/organizer/list/ListDTO";
import { mapListDTO } from "../../../mappers/organizer/ListDetailMapper";
import { ListService } from "../../../services/organizer/ListService";

export class GetListDetailsUseCase {

    private listService: ListService;

    constructor() {
        this.listService = new ListService();
    }

    public async execute(listIdPk: number): Promise<ListDTO> {
        const listDetail = await this.listService.getListDetail(listIdPk);

        return await mapListDTO(listDetail);
    }
    
}
