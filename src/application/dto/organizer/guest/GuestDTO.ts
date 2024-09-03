import { ListDTO } from "../list/ListDTO";

export class GuestDTO {
    public id?: number;
    public name: string;
    public listId: number;
    public createdAt: Date;
    public list?: ListDTO;

    constructor(data: Partial<GuestDTO>) {
        this.id = data.id;
        this.name = data.name!;
        this.listId = data.listId!;
        this.createdAt = data.createdAt!;
        this.list = data.list ? new ListDTO(data.list) : undefined;
    }

    toJSON() {
        const obj: any = { ...this };

        if (obj.schedule === null) {
            delete obj.schedule;
        }
        return obj;
    }

}