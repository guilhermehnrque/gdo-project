import { booleanToTinyInt } from "../../application/utils/BooleanUtils";
import CreateGroupDTO from "../../application/dto/group/CreateGroupDTO";

export default class GroupEntity {

    id: number | null;
    description: string;
    is_active: boolean;
    users_id: number;

    constructor(id: number | null, description: string, is_active: boolean, users_id: number) {
        this.id = id;
        this.description = description;
        this.is_active = is_active;
        this.users_id = users_id;
    }

    static async createFromDTO(payload: CreateGroupDTO, userId: number): Promise<GroupEntity> {
        return new GroupEntity(
            null,
            payload.description,
            true,
            userId
        );
    }

    static async createFromPayloadUpdate(groupId: number, userId: number, description: string, status: boolean): Promise<GroupEntity> {
        return new GroupEntity(
            groupId,
            description,
            status,
            userId
        )
    }

    toCreatePayload() {
        return {
            description: this.description,
            is_active: booleanToTinyInt(this.is_active),
            users_id: this.users_id
        };
    }

    toUpdatePayload() {
        return {
            id: this.id!,
            description: this.description,
            is_active: booleanToTinyInt(this.is_active),
            users_id: this.users_id
        };
    }


}
