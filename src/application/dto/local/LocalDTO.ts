export class LocalDTO {
    public id?: number;
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public zip_code: number;
    public number: number | null;
    public description: string;
    public groups_id: number;
    public created_at: Date;
    public updated_at: Date;

    constructor(payload: Partial<LocalDTO>) {
        this.id = payload.id;
        this.country = payload.country!;
        this.state = payload.state!;
        this.city = payload.city!;
        this.street = payload.street!;
        this.zip_code = payload.zip_code!;
        this.number = payload.number!;
        this.description = payload.description!;
        this.groups_id = payload.groups_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
    }

    toJSON() {
        return {
            id: this.id,
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            zipCode: this.zip_code,
            number: this.number,
            description: this.description,
            groupId: this.groups_id,
            createdAt: this.created_at,
            updatedAt: this.updated_at
        }
    }
}
