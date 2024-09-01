import { PlayersEntity } from "../../domain/entity/PlayersListEntity";
import { PlayersListRepositoryImpl } from "../../infrastructure/repositories/PlayersListRepositoryImpl";
import { PlayerAlreadyInListError, PlayerNotFoundInListError } from "../erros/playersList/PlayersListError";

export class PlayersListService {

    private playersListRepository: PlayersListRepositoryImpl;

    constructor() {
        this.playersListRepository = new PlayersListRepositoryImpl();
    }

    public async getPlayerListsByListId(playerId: number): Promise<PlayersEntity[]> {
        const playerList = await this.playersListRepository.getPlayerListsByListId(playerId);

        if (playerList.length <= 0) {
            throw new PlayerNotFoundInListError();
        }

        return playerList.map(player => new PlayersEntity(player));
    }

    public async getPlayerListByPlayerIdAndListId(playerId: number, listId: number): Promise<PlayersEntity | null> {
        const list = await this.playersListRepository.getPlayerInListByPlayerId(playerId, listId);

        if (!list || list === null) {
            throw new PlayerNotFoundInListError();
        }

        return new PlayersEntity(list);
    }

    private checkIsAnyPlayerInList(players: PlayersEntity[]): void {
        if (players.length <= 0) {
            throw new PlayerNotFoundInListError();
        }
    }

    public async checkIsPlayerAlreadyInList(playerEntity: PlayersEntity): Promise<void> {
        const response = await this.playersListRepository.getPlayerInListByPlayerId(playerEntity.players_id, playerEntity.lists_id);

        if (response || response != null) {
            const name = response?.user.name
            throw new PlayerAlreadyInListError(`O jogador ${name} já está na lista`);
        }

    }

    private checkIsPlayerNotInList(player: PlayersEntity | null): void {
        if (!player || player === null) {
            throw new PlayerNotFoundInListError();
        }
    }

}