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
    public players_id: number | null;
    public lists_id: number | null;

    public player: PlayerDTO | null;
    public list: ListDTO | null;

    constructor(payload: Partial<PlayersListDTO>) {
        this.id = payload.id!;
        this.player_status = payload.player_status!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at! ?? null;
        this.players_id = payload.players_id! ?? null;
        this.lists_id = payload.lists_id!;
        this.player = payload.player ? new PlayerDTO(payload.player) : null;
        this.list = payload.list ? new ListDTO(payload.list) : null;
    }

    toJSON() {
        const obj: any = { ...this };

        if (obj.schedule == null) {
            delete obj.schedule;
        }
        
        return obj;
    }

}