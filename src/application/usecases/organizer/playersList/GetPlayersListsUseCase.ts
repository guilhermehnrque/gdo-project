import { PlayersListDTO } from "../../../dto/organizer/playersList/PlayersListDTO";
import { mapAllPlayersList } from "../../../mappers/organizer/PlayersListDetailMapper";
import { PlayersListService } from "../../../services/PlayersListService";

export class GetPlayersListsUseCase {

    private playersListService: PlayersListService;

    constructor() {
        this.playersListService = new PlayersListService();
    }

    async execute(): Promise<PlayersListDTO[]> {
        const list = await this.playersListService.getPlayersList();
        const mapped = await mapAllPlayersList(list);

        return mapped;
    }
}