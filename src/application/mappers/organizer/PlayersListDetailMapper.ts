import { ListEntity } from "../../../domain/entity/organizer/ListEntity";
import { PlayersEntity } from "../../../domain/entity/PlayersListEntity";
import { PlayersListDTO } from "../../dto/organizer/playersList/PlayersListDTO";

export function mapPlayerLists(playerListEntity: PlayersEntity[], listsEntity: ListEntity[]): Promise<PlayersListDTO[]> { 
    return Promise.resolve(
        listsEntity.flatMap(list => {  
            const players = playerListEntity.filter(player => player.lists_id === list.id);

            return players.map(player => ({
                id: player.id,
                player_status: player.player_status,
                created_at: player.created_at,
                updated_at: player.updated_at,
                players_id: player.players_id,
                lists_id: player.lists_id,
                player: {
                    name: player.user.name,
                    surname: player.user.surname,
                    email: player.user.email,
                    phone_number: player.user.phone_number
                },
                list: {
                    id: list.id,
                    status: list.status,
                    created_at: list.created_at!
                },
                toJSON() {
                    const obj: any = { ...this };
                    return obj;
                }
            }));
        })
    );
}

