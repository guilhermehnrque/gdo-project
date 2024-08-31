import CreateGroupDTO from "../../application/dto/group/CreateGroupDTO";

export default class GroupEntity {

    id: number | null;
    description: string;
    is_active: boolean;
    users_id: number;
    visibility: string;

    constructor(
        id: number | null,
        description: string,
        is_active: boolean,
        users_id: number,
        visibility: string,
    ) {
        this.id = id;
        this.description = description;
        this.is_active = is_active;
        this.users_id = users_id;
        this.visibility = visibility;
    }

    static async createFromDTO(payload: CreateGroupDTO, userId: number): Promise<GroupEntity> {
        return new GroupEntity(
            null,
            payload.description,
            true,
            userId,
            payload.visibility
        );
    }

    static async createFromPayloadUpdate(
        groupId: number,
        userId: number,
        description: string,
        status: boolean,
        visibility: string
    ): Promise<GroupEntity> {
        return new GroupEntity(
            groupId,
            description,
            status,
            userId,
            visibility
        )
    }

    toCreatePayload() {
        return {
            description: this.description,
            is_active: this.is_active,
            users_id: this.users_id,
            visibility: this.visibility
        };
    }

    toUpdatePayload() {
        return {
            id: this.id!,
            description: this.description,
            is_active: this.is_active,
            users_id: this.users_id,
            visibility: this.visibility
        };
    }


}
