import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import { PlayersEntity } from "../../domain/entity/PlayersListEntity";
import { List } from "../../domain/models/ListModel";
import { PlayersList } from "../../domain/models/PlayersList";
import { User } from "../../domain/models/UserModel";
import { PlayersListInterface } from "../../domain/repositories/PlayersListInterface";

export class PlayersListRepositoryImpl implements PlayersListInterface {
    async registerPlayer(player: PlayersEntity[]): Promise<void> {
        try {
            const playerList = PlayersList.bulkBuild(player.map(player => player.createPayload()));
            playerList.map(player => player.save());

        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Register player -> Error registering player: ${customError.message}`);
        }
    }

    async updatePlayerStatus(playerList: PlayersEntity): Promise<number> {
        try {
            const [affectedCount] = await PlayersList.update(playerList.updatePayload(), {
                where: { id: playerList.id }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Update player status -> Error updating player status: ${customError.message}`);
        }
    }

    async removePlayerFromList(player: PlayersEntity): Promise<number> {
        try {
            const affectedCount = await PlayersList.destroy({
                where: { id: player.id }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Remove player from list -> Error removing player from list: ${customError.message}`);
        }
    }

    async getPlayerListsByListId(listId: number): Promise<PlayersList[]> {
        try {
            return await PlayersList.findAll({
                where: {
                    players_id: listId
                },
                include: [{
                    model: User,
                    as: 'user'
                },
                {
                    model: List,
                    as: 'list'
                }]
            });
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Get players list by list id -> Error getting players list by list id: ${customError.message}`);
        }
    }

    async getPlayerInListByPlayerId(playerId: number, listId: number): Promise<PlayersList | null> {
        try {
            return await PlayersList.findOne({
                where: {
                    players_id: playerId,
                    lists_id: listId
                },
                include: [{
                    model: User,
                    as: 'user'
                },
                {
                    model: List,
                    as: 'list'
                }
                ]
            });
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Get player in list by player id -> Error getting player in list by player id: ${customError.message}`);
        }
    }

    async getPlayersList(): Promise<PlayersList[]> {
        try {
            return await PlayersList.findAll();
        } catch (error) {
            const customError = error as CustomError
            throw new DatabaseError(`[PlayersListRepository] Get players list -> Error getting players list: ${customError.message}`);
        }
    }
}