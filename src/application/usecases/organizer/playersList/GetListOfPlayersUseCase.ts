import { PlayersListService } from "../../../services/PlayersListService";
import { mapPlayerLists } from "../../../mappers/organizer/PlayersListDetailMapper";
import { PlayersListDTO } from "../../../dto/organizer/playersList/PlayersListDTO";

export class GetListOfPlayersUseCase {

    private playersListService: PlayersListService;

    constructor() {
        this.playersListService = new PlayersListService();
    }

    async execute(userId: string, listId: number): Promise<PlayersListDTO[]> {
        const list = await this.playersListService.getListOfPlayers(listId);

        return mapPlayerLists(list);
    }

}