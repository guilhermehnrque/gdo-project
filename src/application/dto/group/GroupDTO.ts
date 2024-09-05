import { LocalDTO } from '../local/LocalDTO';

export class GroupDTO {
    public id?: number;
    public description: string;
    public is_active: boolean;
    public users_id: number;
    public created_at: Date;
    public updated_at?: Date;
    public local: LocalDTO;

    constructor(payload: Partial<GroupDTO>) {
        this.id = payload.id;
        this.description = payload.description!;
        this.is_active = payload.is_active!;
        this.users_id = payload.users_id!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at;
        this.local = payload.local!;
    }

    static withLocalFromEntity(group: Partial<GroupDTO>): GroupDTO {
        return new GroupDTO({
            id: group.id!,
            description: group.description!,
            is_active: group.is_active!,
            users_id: group.users_id!,
            created_at: group.created_at!,
            updated_at: group.updated_at!,
            local: group.local
        });
    }


    static withoutLocalFromEntity(group: Partial<GroupDTO>): GroupDTO {
        return new GroupDTO({
            id: group.id!,
            description: group.description!,
            is_active: group.is_active!,
            users_id: group.users_id!,
            created_at: group.created_at!,
            updated_at: group.updated_at!,
        });
    }

    toJSON() {
        return {
            id: this.id,
            description: this.description,
            status: this.is_active,
            organizerId: this.users_id,
            createdAt: this.created_at,
            updatedAt: this.updated_at,
            local: this.local
        }
    }
}