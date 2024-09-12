import { ListEntity } from "../../entity/organizer/ListEntity";
import { List } from "../../models/ListModel";

export interface ListRepositoryInterface {
    createList(listEntity: ListEntity): Promise<List>;
    updateList(listEntity: ListEntity): Promise<number>;
    updateListStatus(idPk: number, status: boolean): Promise<number>;
    getList(idPk: number): Promise<List | null>;
    getLists(scheduleId: number[]): Promise<List[]>;
    getListDetail(idPk: number): Promise<List | null>;
    getListsByScheduleId(scheduleId: number): Promise<List | null>;
    getListsByGroupsIds(groupsIds: number[]): Promise<List[]>
}
