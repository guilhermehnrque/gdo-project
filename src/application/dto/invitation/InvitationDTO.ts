export class InvitationDTO {
    private id?: string
    private code: string
    private status: string
    private isExpired: boolean
    private createdAt: Date
    private updatedAt?: Date
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
    }

    public setId(id: string) { this.id = id }
    public setUpdatedAt(updatedAt: Date) { this.updatedAt = updatedAt } 

}