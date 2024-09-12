import { PlayersEntity } from "../../../../domain/entity/PlayersListEntity";
import { PlayersListRepositoryImpl } from "../../../../infrastructure/repositories/PlayersListRepositoryImpl";
import { ListService } from "../../../services/organizer/ListService";
import { PlayersListService } from "../../../services/PlayersListService";
import { UserService } from "../../../services/UserService";

export class RegisterPlayerListUserUseCase {

    private playersListRepository: PlayersListRepositoryImpl;
    private playersListService: PlayersListService;
    private listService: ListService;
    private userService: UserService;

    constructor() {
        this.playersListRepository = new PlayersListRepositoryImpl();
        this.playersListService = new PlayersListService();
        this.listService = new ListService();
        this.userService = new UserService();
    
    }

    public async execute(listId: number, playersId: number[], playerStatus: string): Promise<void> {
        const players = await Promise.all(playersId.map(async playerId => {
            return PlayersEntity.fromCreateUseCase({ lists_id: listId, players_id: playerId, player_status: playerStatus });
        }));

        await this.listService.checkListIsNotActive(listId);
        await this.ensureListOfPlayers(players);

        await this.playersListRepository.registerPlayer(players);
    }

    private async ensureListOfPlayers(players: PlayersEntity[]): Promise<void> {
        await Promise.all(players.map(async player => await this.playersListService.checkIsPlayerAlreadyInList(player)));
        await this.userService.validateArrayOfUsers(players.map(player => player.players_id));
    }

}