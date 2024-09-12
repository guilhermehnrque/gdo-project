import { InvitationStatus } from '../enums/InvitationStatus';

export class InvitationEntity {
    public id?: number | null;
    public code?: string;
    public group_id?: number;
    public invited_user_id?: number;
    public status?: InvitationStatus;
    public expires_at?: Date;
    public created_at?: Date;
    public updated_at?: Date;
    public inviting_user_id?: number;

    private readonly EXPIRATION_INVITE_DAYS = +process.env.EXPIRATION_INVITE_DATE_DAYS!;

    async fromUseCase(payload: Partial<InvitationEntity>): Promise<InvitationEntity> {
        this.group_id = payload.group_id!;
        this.invited_user_id = payload.invited_user_id!;
        this.status = payload.status!;
        this.inviting_user_id = payload.inviting_user_id;
        this.code = this.generateCreationCode();
        this.expires_at = this.generateExpirationDate();

        return this;
    }

    async fromRepository(payload: Partial<InvitationEntity>): Promise<InvitationEntity> {
        this.id = payload.id!;
        this.code = payload.code!;
        this.group_id = payload.group_id!;
        this.invited_user_id = payload.invited_user_id!;
        this.status = payload.status!;
        this.expires_at = payload.expires_at!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.inviting_user_id = payload.inviting_user_id!;

        return this
    }

    private generateExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + this.EXPIRATION_INVITE_DAYS);
        return expirationDate;
    }

    private generateCreationCode(): string {
        return Math.random().toString(36).substring(2, 14);
    }

    public getInvitationCode(){
        return this.code;
    }

    public toRegister() {
        return {
            code: this.code!,
            status: this.status!.toString(),
            invited_user_id: this.invited_user_id!,
            groups_id: this.group_id!,
            expires_at: this.expires_at!,
            inviting_user_id: this.inviting_user_id!
        };
    }
}
