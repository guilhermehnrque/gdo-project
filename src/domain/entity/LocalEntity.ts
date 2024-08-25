import CreateListDTO from "../../application/dto/list/CreateListDTO";

export default class LocalEntity {

    public id?: number | null;
    public description: string;
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public zip_code: number;
    public number: number | null;
    public groups_id: number;
    public created_at: Date;
    public updated_at?: Date | null;

    constructor(
        description: string,
        state: string,
        country: string,
        city: string,
        street: string,
        zip_code: number,
        number: number | null,
        groups_id: number,
        created_at: Date,
        id?: number | null,
        updated_at?: Date | null
    ) {
        this.id = id;
        this.description = description;
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
        this.zip_code = zip_code;
        this.number = number;
        this.groups_id = groups_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async createFromDTO(payload: CreateListDTO, groupId: number): Promise<LocalEntity> {
        return new LocalEntity(
            payload.description,
            payload.state,
            payload.country,
            payload.city,
            payload.street,
            payload.zip_code,
            payload.number,
            groupId,
            new Date(),
        );
    }

    payloadToCreate() { 
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

}