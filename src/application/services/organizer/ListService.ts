import { ListRepositoryImpl } from "../../../infrastructure/repositories/organizer/ListRepositoryImpl";

export class ListService {

    private listRepository: ListRepositoryImpl

    constructor() {
        this.listRepository = new ListRepositoryImpl();
    }

    public async getListById(listId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async getAllListsByOrganizerId(scheduleId: number, userId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    public async getListDetail(listId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async checkListExistence(listId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async checkListStatus(listId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

}