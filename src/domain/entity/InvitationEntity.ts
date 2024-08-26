export class InvitationEntity {
    public id?: number | null;
    public code: string;
    public group_id: number;
    public user_id: number;
    public status: string;
    public expires_at?: Date;
    public created_at?: Date;
    public updated_at?: Date;
    public created_by?: number;
    public is_expired?: boolean | null;

    constructor(
        group_id: number,
        user_id: number,
        status: string,
        code?: string,
        id?: number | null,
        created_at?: Date,
        updated_at?: Date,
        created_by?: number,
        expires_at?: Date,
        is_expired?: boolean | null
    ) {
        this.id = id ?? null;
        this.code = code ?? this.generateCreationCode();
        this.group_id = group_id;
        this.user_id = user_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.created_by = created_by;
        this.expires_at = expires_at ?? this.generateExpirationDate();
        this.is_expired = is_expired ?? false;
    }

    static async createFromPayload(group_id: number, user_id: number, status: string, userIdOwner: number): Promise<InvitationEntity> {
        return new InvitationEntity(group_id, user_id, status, undefined, null, undefined, undefined, userIdOwner);
    }

    private generateExpirationDate(): Date {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 3);
        return expirationDate;
    }

    private generateCreationCode(): string {
        return Math.random().toString(36).substring(2, 6);
    }

    toRegister() {
        return {
            code: this.code,
            status: this.status,
            users_id: this.user_id,
            groups_id: this.group_id,
            expires_at: this.expires_at,
            created_by: this.created_by
        };
    }
}
