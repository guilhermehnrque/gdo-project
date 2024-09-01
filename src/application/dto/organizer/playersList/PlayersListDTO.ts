export class PlayerDTO {
    public name: string;
    public surname: string
    public email: string;
    public phone_number: number;

    constructor(payload: Partial<PlayerDTO>) {
        this.name = payload.name!;
        this.surname = payload.surname!;
        this.email = payload.email!;
        this.phone_number = payload.phone_number!;
    }

}

export class ListDTO {
    public status: boolean;
    public created_at: Date;

    constructor(payload: Partial<ListDTO>) {
        this.status = payload.status!;
        this.created_at = payload.created_at!;
    }
}

export class PlayersListDTO {
    public id: number;
    public player_status: string;
    public created_at: Date;
    public updated_at: Date;

    public readonly player: PlayerDTO;
    public readonly list: ListDTO;


    constructor(payload: Partial<PlayersListDTO>) {
        this.id = payload.id!;
        this.player_status = payload.player_status!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.player = new PlayerDTO(payload.player!);
        this.list = new ListDTO(payload.list!);
    }

    toJSON() {
        return {
            id: this.id,
            playerStatus: this.player_status,
            createdAt: this.created_at,
            player: this.player,
            list: this.list
        }
    }
}