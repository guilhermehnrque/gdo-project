export interface ListAttributes {
    id?: number;
    description: string | null;
    status: boolean;
    limit: number;
    groups_id: number;
    schedules_id: number;
    created_at?: Date;
    updated_at?: Date;
}