import { InvitationUserDTO } from "./InvitationUserDTO"

export class InvitationDTO {
    public id?: number
    public code: string
    public status: string
    public createdAt: Date
    public updatedAt?: Date
    public expiresAt: Date
    public groupId: number
    public invited_user?: InvitationUserDTO
    public inviting_user?: InvitationUserDTO

    constructor(
        code: string, 
        status: string, 
        groupId: number, 
        created_at: Date, 
        expires_at: Date,
        updated_at?: Date, 
        id?: number,
        invited_user?: InvitationUserDTO,
        inviting_user?: InvitationUserDTO
    ) {
        this.code = code
        this.status = status
        this.groupId = groupId;
        this.createdAt = created_at;
        this.expiresAt = expires_at;
        this.updatedAt = updated_at;
        this.id = id;
        this.invited_user = invited_user;
        this.inviting_user = inviting_user;
    }

    public setId(id: number) { this.id = id }
    public setUpdatedAt(updatedAt: Date) { this.updatedAt = updatedAt } 

    toResponse() {
        return {
            code: this.code,
            status: this.status,
            created_at: this.createdAt,
            expires_at: this.expiresAt,
            group_id: this.groupId,
            invited_user: this.invited_user,
            inviting_user: this.inviting_user
        }
    }
}
