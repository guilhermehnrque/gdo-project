import { GroupAttributes } from "../interfaces/attributes/GroupAttributes";

interface Local {
    id?: number;
    country: string;
    state: string;
    city: string;
    street: string;
    zip_code: number;
    number: number | null;
    description: string;
    groups_id: number;
    created_at: Date;
    updated_at?: Date;
}

export class GroupEntity implements GroupAttributes {

    public id?: number;
    public description: string;
    public is_active: boolean;
    public users_id: number;
    public visibility: string;
    public created_at: Date;
    public updated_at: Date | undefined;
    public deleted_at: Date | undefined;

    public local?: Local;

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

    static async fromService(payload: Partial<GroupEntity>): Promise<GroupEntity> {
        let groupEntity = new GroupEntity({ ...payload });

        if (payload.local) {
            groupEntity.local = groupEntity.mapLocal(payload.local)
        }

        return groupEntity
    }

    public setStatus(status: boolean) {
        this.is_active = status;
    }   

    public setId(id: number) {
        this.id = id;
    }

    private mapLocal(local: Local): Local {
        return {
            id: local.id,
            country: local.country,
            state: local.state,
            city: local.city,
            street: local.street,
            zip_code: local.zip_code,
            number: local.number,
            description: local.description,
            groups_id: local.groups_id,
            created_at: local.created_at,
            updated_at: local.updated_at
        };
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
