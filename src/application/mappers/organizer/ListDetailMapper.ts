import { ListEntity } from "../../../domain/entity/organizer/ListEntity";
import { ListDTO } from "../../dto/organizer/list/ListDTO";

export function mapListWithDetailsDTO(list: ListEntity): Promise<ListDTO> {
    return Promise.resolve(
        new ListDTO({
            id: list.id,
            description: list.description,
            status: list.status,
            limit: list.limit,
            createdAt: list.created_at,
            updatedAt: list.updated_at,
            schedule: list.schedule,
        })
    );
}

export function mapListWithDTO(list: ListEntity): Promise<ListDTO> {
    return Promise.resolve(
        new ListDTO({
            id: list.id,
            description: list.description,
            status: list.status,
            scheduleId: list.schedules_id,
            limit: list.limit,
            createdAt: list.created_at,
            updatedAt: list.updated_at,
            groupId: list.groups_id,
        })
    );
}