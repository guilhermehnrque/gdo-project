export class InvitationDTO {
    private id?: string
    private code: string
    private status: string
    private isExpired: boolean
    private createdAt: Date
    private updatedAt?: Date
    private expiresAt: Date
    private invitingUserId: string
    private groupId: number
    private invitedUserId: string

    constructor(
        code: string, 
        status: string, 
        isExpired: boolean, 
        createdAt: Date, 
        invitingUserId: string, 
        groupId: number, 
        invitedUserId: string,
        expiresAt: Date,
        updatedAt?: Date, 
        id?: string
    ) {
        this.code = code
        this.status = status
        this.isExpired = isExpired;
        this.createdAt = createdAt;
        this.invitingUserId = invitingUserId;
        this.groupId = groupId;
        this.invitedUserId = invitedUserId;
        this.expiresAt = expiresAt;
    }

    public setId(id: string) { this.id = id }
    public setUpdatedAt(updatedAt: Date) { this.updatedAt = updatedAt } 

    toResponse() {
        return {
            id: this.id,
            code: this.code,
            status: this.status,
            is_expired: this.isExpired,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            expires_at: this.expiresAt,
            inviting_user_id: this.invitingUserId,
            group_id: this.groupId,
            invited_user_id: this.invitedUserId,
        }
    }

}