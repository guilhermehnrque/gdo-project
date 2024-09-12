
import { GetListOfPlayersUseCase } from '../../usecases/organizer/playersList/GetListOfPlayersUseCase';
import { RegisterPlayerListUserUseCase } from '../../usecases/organizer/playersList/RegisterPlayerListUserUseCase';
import { RemovePlayerListUseCase } from '../../usecases/organizer/playersList/RemovePlayerListUseCase';
import { UpdatePlayerListUseCase } from '../../usecases/organizer/playersList/UpdatePlayerListUseCase';

export class PlayersListFacade {

    private registerPlayerUserUseCase: RegisterPlayerListUserUseCase;
    private removePlayerUseCase: RemovePlayerListUseCase;
    private updatePlayerUseCase: UpdatePlayerListUseCase;
    private getlistOfPlayersUseCase: GetListOfPlayersUseCase;

    constructor() {
        this.registerPlayerUserUseCase = new RegisterPlayerListUserUseCase();
        this.removePlayerUseCase = new RemovePlayerListUseCase();
        this.updatePlayerUseCase = new UpdatePlayerListUseCase();
        this.getlistOfPlayersUseCase = new GetListOfPlayersUseCase();
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

    public async getPlayerList(userId: string, groupId: number): Promise<any> {
        return await this.getlistOfPlayersUseCase.execute(userId, groupId);
    }

}