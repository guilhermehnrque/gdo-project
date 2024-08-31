import { ListCreatePayload } from "../../interfaces/payloads/list/ListCreatePayload";
import { ListUpdatePayload } from "../../interfaces/payloads/list/ListUpdatePayload";

export class ListFacade {

    constructor() {
    }

    public async createList(payload: ListCreatePayload): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async updateListById(listId: number, listUpdateRequest: ListUpdatePayload): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async deleteListById(listId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getListById(listId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getAllListsByOrganizerId(scheduleId: number, userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}