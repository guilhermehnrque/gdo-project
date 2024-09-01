export class ListDTO {
    public id?: number;
    public description: string | null;
    public status: boolean;
    public createdAt?: Date;
    public updatedAt?: Date;
    public scheduleId: number;

    constructor(data: Partial<ListDTO>) {
        this.description = data.description!;
        this.status = data.status!;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.id = data.id;
        this.scheduleId = data.scheduleId!;
    }
    
}