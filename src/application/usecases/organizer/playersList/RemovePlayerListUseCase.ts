import { PlayersListRepositoryImpl } from "../../../../infrastructure/repositories/PlayersListRepositoryImpl";
import { PlayersListService } from "../../../services/PlayersListService";
import { PlayersEntity } from "../../../../domain/entity/PlayersListEntity";

export class RemovePlayerListUseCase {

    private playersListRepository: PlayersListRepositoryImpl;
    private playersListService: PlayersListService;

    constructor() {
        this.playersListRepository = new PlayersListRepositoryImpl();
        this.playersListService = new PlayersListService();
    }

    public async execute(listId: number, playersId: number): Promise<number> {
        const list = await this.playersListService.getPlayerListByPlayerIdAndListId(playersId, listId);

        const removedPlayer = await PlayersEntity.fromUpdateUseCase({ ...list });

        return await this.playersListRepository.removePlayerFromList(removedPlayer);
    }
}