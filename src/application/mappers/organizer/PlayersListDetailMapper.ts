import { PlayersEntity } from "../../../domain/entity/PlayersListEntity";
import { PlayersListDTO } from "../../dto/organizer/playersList/PlayersListDTO";

export function mapPlayerLists(playerListEntity: PlayersEntity[]): Promise<PlayersListDTO[]> {
    return Promise.resolve(playerListEntity.map(list => {
        return new PlayersListDTO({
            id: list.id,
            player_status: list.player_status,
            created_at: list.created_at,
            updated_at: list.updated_at,
        })
    }));

}

export function mapPlayerList(player: PlayersEntity): Promise<PlayersListDTO> {
    return Promise.resolve(
        new PlayersListDTO({
            id: player.id,
            player_status: player.player_status,
            created_at: player.created_at,
            updated_at: player.updated_at,
            player: player.user,
            list: player.list,
        })
    );
}