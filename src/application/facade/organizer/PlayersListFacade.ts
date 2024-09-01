
import { RegisterPlayerListUserUseCase } from '../../usecases/organizer/playersList/RegisterPlayerListUserUseCase';
import { RemovePlayerListUseCase } from '../../usecases/organizer/playersList/RemovePlayerListUseCase';
import { UpdatePlayerListUseCase } from '../../usecases/organizer/playersList/UpdatePlayerListUseCase';
import { GetPlayerListUseCase } from '../../usecases/organizer/playersList/GetPlayerListUseCase';
import { GetPlayerListsUseCase } from '../../usecases/organizer/playersList/GetPlayerListsUseCase';
import { GetPlayersListsUseCase } from '../../usecases/organizer/playersList/GetPlayersListsUseCase';

export class PlayersListFacade {

    private registerPlayerUserUseCase: RegisterPlayerListUserUseCase;
    private removePlayerUseCase: RemovePlayerListUseCase;
    private updatePlayerUseCase: UpdatePlayerListUseCase;
    private getPlayerListUseCase: GetPlayerListUseCase;
    private getPlayerListsUseCase: GetPlayerListsUseCase;
    private getPlayersListsUseCase: GetPlayersListsUseCase;

    constructor() {
        this.registerPlayerUserUseCase = new RegisterPlayerListUserUseCase();
        this.removePlayerUseCase = new RemovePlayerListUseCase();
        this.updatePlayerUseCase = new UpdatePlayerListUseCase();
        this.getPlayerListUseCase = new GetPlayerListUseCase();
        this.getPlayerListsUseCase = new GetPlayerListsUseCase();
        this.getPlayersListsUseCase = new GetPlayersListsUseCase();
    }

    public async registerPlayer(listId: number, playersId: number[], playerStatus: string): Promise<void> {
        await this.registerPlayerUserUseCase.execute(listId, playersId, playerStatus);
    }

    public async removePlayer(listId: number, playerId: number): Promise<void> {
        await this.removePlayerUseCase.execute(listId, playerId);
    }

    public async updatePlayer(listId: number, playerId: number, playerStatus: string): Promise<number> {
        return await this.updatePlayerUseCase.execute(listId, playerId, playerStatus);
    }

    public async getPlayerList(playerId: number, listId: number) {
        return await this.getPlayerListUseCase.execute(playerId, listId);
    }

    public async getPlayerLists(playerId: number) {
        return await this.getPlayerListsUseCase.execute(playerId);
    }

    public async getAllLists() {
        return await this.getPlayersListsUseCase.execute();
    }
}