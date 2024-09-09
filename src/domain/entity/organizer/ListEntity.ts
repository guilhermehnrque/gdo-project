import { Schedule } from "../../models/ScheduleModel";

export class ListEntity {

    public id?: number;
    public description: string | null;
    public status: boolean;
    public limit: number;
    public schedules_id: number;
    public created_at?: Date;
    public updated_at?: Date;

    public readonly schedule: Schedule;

    constructor(data: Partial<ListEntity>) {
        this.description = data.description!;
        this.status = data.status!;
        this.schedules_id = data.schedules_id!;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.id = data.id;
        this.schedule = data.schedule!;
        this.limit = data.limit!;
    }

    public toCreatePayload() {
        return {
            description: this.description,
            status: this.status,
            schedules_id: this.schedules_id,
            limit: this.limit,
            created_at: this.created_at,
            updated_at: this.updated_at
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