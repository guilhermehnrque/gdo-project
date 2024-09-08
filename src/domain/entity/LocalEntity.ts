import { CreateLocalDTO } from "../../application/dto/local/CreateLocalDTO";
import { LocalAttributes } from "../interfaces/attributes/LocalAttributes";

export class LocalEntity implements LocalAttributes {

    public id?: number;
    public description: string;
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public zip_code: number;
    public number: number | null;
    public groups_id: number;
    public created_at: Date;
    public updated_at?: Date;

    constructor(payload: Partial<LocalEntity>) {
        this.description = payload.description!;
        this.country = payload.country!;
        this.state = payload.state!;
        this.city = payload.city!;
        this.street = payload.street!;
        this.zip_code = payload.zip_code!;
        this.number = payload.number!;
        this.groups_id = payload.groups_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at;
        this.id = payload.id;
    }

    static async createFromDTO(payload: CreateLocalDTO, groupId: number): Promise<LocalEntity> {
        return new LocalEntity({
            ...payload.payloadToCreate(),
            groups_id: groupId,
            created_at: new Date(),
        });
    }

    static async fromService(payload: Partial<LocalEntity>): Promise<LocalEntity> {
        return new LocalEntity({
            ...payload
        });
    }

    public payloadToCreate() {
        return {
            description: this.description,
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            zip_code: this.zip_code,
            number: this.number,
            groups_id: this.groups_id,
        }
    }

    public payloadToUpdate() {
        return {
            id: this.id!,
            description: this.description,
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            zip_code: this.zip_code,
            number: this.number,
            groups_id: this.groups_id,
            updated_at: new Date(),
        }
    }
}