import { ListRepositoryInterface } from "../../../domain/repositories/organizer/ListRepositoryInterface";
import { List } from "../../../domain/models/ListModel";
import { ListEntity } from "../../../domain/entity/organizer/ListEntity";
import { CustomError } from "../../../application/erros/CustomError";
import DatabaseError from "../../../application/erros/DatabaseError";
import { Schedule } from "../../../domain/models/ScheduleModel";

export class ListRepositoryImpl implements ListRepositoryInterface {

    async createList(listEntity: ListEntity): Promise<List> {
        try {
            return await List.create(listEntity.toCreatePayload());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] createList error creating lists -> ${customError.message}`);
        }
    }

    async updateList(listEntity: ListEntity): Promise<number> {
        try {
            const [affectedCount] = await List.update(listEntity.toUpdatePayload(), {
                where: { id: listEntity.id }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] updateList error updating lists -> ${customError.message}`);
        }
    }

    async updateListStatus(idPk: number, status: boolean): Promise<number> {
        try {
            const [affectedCount] = await List.update({ status: status }, {
                where: { id: idPk }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] updateListStatus error updating lists -> ${customError.message}`);
        }
    }

    async getList(idPk: number): Promise<List | null> {
        try {
            return await List.findOne({
                where: {
                    id: idPk
                }
            })
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getList error getting lists -> ${customError.message}`);
        }
    }

    async getListDetail(idPk: number): Promise<List | null> {
        try {
            return await List.findOne({
                where: {
                    id: idPk
                },
                include: [
                    {
                        model: Schedule,
                        as: 'schedule',
                    }
                ]
            })
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getListDetail error getting lists -> ${customError.message}`);
        }
    }

    async getLists(scheduleId: number[]): Promise<List[]> {
        try {
            return await List.findAll({
                where: {
                    schedules_id: scheduleId
                },
                include: [
                    {
                        model: Schedule,
                        as: 'schedule',
                    }
                ]
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getLists error getting lists -> ${customError.message}`);
        }
    }

    async getListsByScheduleId(scheduleId: number): Promise<List | null> {
        try {
            return await List.findOne({
                where: {
                    schedules_id: scheduleId
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getListsByScheduleId error getting lists -> ${customError.message}`);
        }
    }

    async getListsByGroupsIds(groupsIds: number[]): Promise<List[]> {
        try {
            return await List.findAll({
                where: {
                    groups_id: groupsIds
                }
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] getListsByGroupsIds error getting lists -> ${customError.message}`);
        }
    }

}
