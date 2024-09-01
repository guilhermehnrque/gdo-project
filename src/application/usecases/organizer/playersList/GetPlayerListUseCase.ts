import { PlayersListService } from "../../../services/PlayersListService";
import { mapPlayerList } from "../../../mappers/organizer/PlayersListDetailMapper";
import { PlayersListDTO } from "../../../dto/organizer/playersList/PlayersListDTO";

export class GetPlayerListUseCase {

    private playersListService: PlayersListService;

    constructor() {
        this.playersListService = new PlayersListService();
    }

    async execute(playerId: number, listId: number): Promise<PlayersListDTO> {
        const list = await this.playersListService.getPlayerListByPlayerIdAndListId(playerId, listId);

        return mapPlayerList(list!);
    }
}