import { GroupAttributes } from "../interfaces/attributes/GroupAttributes";

export class GroupEntity implements GroupAttributes {

    public id?: number;
    public description: string;
    public is_active: boolean;
    public users_id: number;
    public visibility: string;
    public created_at: Date;
    public updated_at: Date | undefined;
    public deleted_at: Date | undefined;

    constructor(payload: Partial<GroupEntity>) {
        this.description = payload.description!;
        this.is_active = payload.is_active!;
        this.users_id = payload.users_id!;
        this.visibility = payload.visibility!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at;
        this.deleted_at = payload.deleted_at;
        this.id = payload.id;
    }

    static async createFromDTO(payload: Partial<GroupEntity>, user_id: number): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload,
            users_id: user_id,
            created_at: new Date(),
        });
    }

    static async createFromPayloadUpdate(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload,
            updated_at: new Date(),
        });
    }

    static async fromUseCase(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        return new GroupEntity({
            ...payload,
        });
    }

    toCreatePayload() {
        return {
            description: this.description,
            is_active: this.is_active,
            users_id: this.users_id,
            visibility: this.visibility,
            created_at: this.created_at
        };
    }

    toUpdatePayload() {
        return {
            id: this.id!,
            description: this.description,
            is_active: this.is_active,
            users_id: this.users_id,
            visibility: this.visibility,
            updated_at: this.updated_at
        };
    }


}
