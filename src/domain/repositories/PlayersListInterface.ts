import { PlayersEntity } from "../entity/PlayersListEntity";
import { PlayersList } from "../models/PlayersList";

export interface PlayersListInterface {
    registerPlayer(player: PlayersEntity[]): Promise<void>;
    updatePlayerStatus(player: PlayersEntity): Promise<number>;
    removePlayerFromList(player: PlayersEntity): Promise<number>;
    getPlayerListsByListId(listId: number): Promise<PlayersList[]>;
    getPlayerInListByPlayerId(playerId: number, listId: number): Promise<PlayersList | null>;
}