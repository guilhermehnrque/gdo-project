import { PlayersListDTO } from "../../../dto/organizer/playersList/PlayersListDTO";
import { mapPlayerLists } from "../../../mappers/organizer/PlayersListDetailMapper";
import { PlayersListService } from "../../../services/PlayersListService";

export class GetPlayerListsUseCase {

    private playersListService: PlayersListService;

    constructor() {
        this.playersListService = new PlayersListService();
    }

    async execute(playerId: number): Promise<PlayersListDTO[]> {
        const list = await this.playersListService.getPlayerListsByListId(playerId);

        return mapPlayerLists(list);
    }
}