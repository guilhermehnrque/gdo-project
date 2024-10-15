import { ListAttributes } from "../../interfaces/attributes/ListAttributes";
import { Schedule } from "../../models/ScheduleModel";

export class ListEntity implements ListAttributes {

    public id?: number;
    public description: string | null;
    public status: boolean;
    public groups_id: number;
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
        this.groups_id = data.groups_id!;
        this.id = data.id;
        this.schedule = data.schedule!;
    }

    public toCreatePayload() {
        return {
            description: this.description,
            status: this.status,
            schedules_id: this.schedules_id,
            groups_id: this.groups_id,
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