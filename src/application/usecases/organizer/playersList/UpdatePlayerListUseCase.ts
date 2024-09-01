import { PlayersEntity } from "../../../../domain/entity/PlayersListEntity";
import { PlayersListRepositoryImpl } from "../../../../infrastructure/repositories/PlayersListRepositoryImpl";
import { PlayersListService } from "../../../services/PlayersListService";

export class UpdatePlayerListUseCase {

    private playersListRepository: PlayersListRepositoryImpl;
    private playersListService: PlayersListService;

    constructor() {
        this.playersListRepository = new PlayersListRepositoryImpl();
        this.playersListService = new PlayersListService();
    }

    public async execute(listId: number, playersId: number, playerStatus: string): Promise<number> {
        const list = await this.playersListService.getPlayerListByPlayerIdAndListId(playersId, listId);

        const updatedPlayer = await PlayersEntity.fromUpdateUseCase({ ...list, player_status: playerStatus });

        return await this.playersListRepository.updatePlayerStatus(updatedPlayer);
    }
}