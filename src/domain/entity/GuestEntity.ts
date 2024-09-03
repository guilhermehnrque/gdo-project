import { GuestAttributes } from "../interfaces/attributes/GuestAttributes";

export class GuestEntity implements GuestAttributes {
    public id?: number;
    public name: string;
    public lists_id: number;
    public created_at?: Date;

    constructor(payload: Partial<GuestEntity>) {
        this.name = payload.name!;
        this.lists_id = payload.lists_id!;
        this.id = payload.id;
    }

    static async createFromPayload(payload: Partial<GuestEntity>): Promise<GuestEntity> {
        return new GuestEntity({
            ...payload
        });
    }

    public toRegister() {
        return {
            name: this.name,
            lists_id: this.lists_id,
        }
    }

    public toUpdate() {    
        return {
            name: this.name,
        }
    }
}
