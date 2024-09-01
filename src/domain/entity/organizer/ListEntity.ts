export class ListEntity {

    public id?: number;
    public description: string | null;
    public status: boolean;
    public schedules_id: number;
    public created_at?: Date;
    public updated_at?: Date;

    constructor(data: Partial<ListEntity>) {
        this.description = data.description!;
        this.status = data.status!;
        this.schedules_id = data.schedules_id!;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.id = data.id;
    }


    public toCreatePayload() {
        return {
            description: this.description,
            status: this.status,
            schedules_id: this.schedules_id,
        };
    }

    public toUpdatePayload() {
        return {
            id: this.id,
            description: this.description,
            status: this.status,
            schedules_id: this.schedules_id
        };
    }
}