import { PlayersEntity } from "../../../../domain/entity/PlayersListEntity";
import { PlayersListRepositoryImpl } from "../../../../infrastructure/repositories/PlayersListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";
import { PlayersListService } from "../../../services/PlayersListService";

export class RegisterPlayerListUserUseCase {

    private playersListRepository: PlayersListRepositoryImpl;
    private playersListService: PlayersListService;
    private listService: ListService;

    constructor() {
        this.playersListRepository = new PlayersListRepositoryImpl();
        this.playersListService = new PlayersListService();
        this.listService = new ListService();
    }

    public async execute(listId: number, playersId: number[], playerStatus: string): Promise<void> {
        const players = await Promise.all(playersId.map(async playerId => {
            return PlayersEntity.fromCreateUseCase({ lists_id: listId, players_id: playerId, player_status: playerStatus });
        }));

        await this.listService.checkListIsNotActive(listId);
        this.checkIsAnyPlayerInList(players);

        await this.playersListRepository.registerPlayer(players);
    }

    private async checkIsAnyPlayerInList(players: PlayersEntity[]): Promise<void> {
        const promises = players.map(player => this.playersListService.checkIsPlayerAlreadyInList(player));
        
        try {
            await Promise.all(promises);
        } catch (error) {
            throw error;
        }
    }

}