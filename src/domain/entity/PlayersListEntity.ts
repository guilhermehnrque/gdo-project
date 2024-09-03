import { PlayerListStatusEnum, allowedPlayerListStatus } from "../enums/PlayerListStatusEnum";
import { PlayersListAttributes } from "../interfaces/attributes/PlayersListAttributes";

interface UserAttributes {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone_number: number;
}

interface List {
    id: number;
    status: boolean;
    created_at: Date;
}

export class PlayersEntity implements PlayersListAttributes {
    public id!: number;
    public lists_id!: number;
    public players_id!: number;
    public player_status!: string;
    public created_at!: Date;
    public updated_at!: Date;

    public readonly user!: UserAttributes;
    public readonly list!: List;

    constructor(payload: Partial<PlayersEntity>) {
        this.id = payload.id!;
        this.lists_id = payload.lists_id!;
        this.players_id = payload.players_id!;
        this.player_status = this.mapStatus(payload.player_status!);
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
    }

    static async fromCreateUseCase(payload: Partial<PlayersEntity>): Promise<PlayersEntity> {
        return new PlayersEntity({
            ...payload,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    static async fromUpdateUseCase(payload: Partial<PlayersEntity>): Promise<PlayersEntity> {
        return new PlayersEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    private mapStatus(status: string): string {
        if (!allowedPlayerListStatus().includes(status.toUpperCase() as PlayerListStatusEnum)) {
            throw new Error('Status inválido');
        }

        return status
    }

    public createPayload() {
        return {
            lists_id: this.lists_id,
            players_id: this.players_id,
            player_status: this.player_status,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

    public updatePayload() {
        return {
            lists_id: this.lists_id,
            players_id: this.players_id,
            player_status: this.player_status,
            updated_at: this.updated_at,
        }
    }

}