
import { RegisterPlayerListUserUseCase } from '../../usecases/organizer/playersList/RegisterPlayerListUserUseCase';
import { RemovePlayerListUseCase } from '../../usecases/organizer/playersList/RemovePlayerListUseCase';
import { UpdatePlayerListUseCase } from '../../usecases/organizer/playersList/UpdatePlayerListUseCase';
import { GetPlayerListUseCase } from '../../usecases/organizer/playersList/GetPlayerListUseCase';
import { GetPlayersListsUseCase } from '../../usecases/organizer/playersList/GetPlayerListsUseCase';

export class PlayersListFacade {

    private registerPlayerUserUseCase: RegisterPlayerListUserUseCase;
    private removePlayerUseCase: RemovePlayerListUseCase;
    private updatePlayerUseCase: UpdatePlayerListUseCase;
    private getPlayersListUseCase: GetPlayerListUseCase;
    private getPlayersListsUseCase: GetPlayersListsUseCase;

    constructor() {
        this.registerPlayerUserUseCase = new RegisterPlayerListUserUseCase();
        this.removePlayerUseCase = new RemovePlayerListUseCase();
        this.updatePlayerUseCase = new UpdatePlayerListUseCase();
        this.getPlayersListUseCase = new GetPlayerListUseCase();
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
        return await this.getPlayersListUseCase.execute(playerId, listId);
    }

    public async getPlayerLists(playerId: number) {
        return await this.getPlayersListsUseCase.execute(playerId);
    }
}