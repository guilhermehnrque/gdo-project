import { ListEntity } from "../../../domain/entity/organizer/ListEntity";
import { ListDTO } from "../../dto/organizer/list/ListDTO";

export function mapListDTO(list: ListEntity): Promise<ListDTO> {
    return Promise.resolve(
        new ListDTO({
            id: list.id,
            description: list.description,
            status: list.status,
            createdAt: list.created_at,
            updatedAt: list.updated_at,
        })
    );
}