export class JwtTokenEntity {

    public id?: number;
    public users_id?: number;
    public token?: string;
    public expires_at?: Date;
    public revoked: boolean;
    public revoked_at?: Date | null;
    public created_at?: Date;
    public updated_at?: Date;

    private readonly DAYS_TO_EXPIRE = 7;

    constructor() {
        this.revoked = false;
    }

    static async createFromPayload(users_id: number, token: string): Promise<JwtTokenEntity> {
        const instance = new JwtTokenEntity();
        instance.users_id = users_id;
        instance.token = token;
        instance.expires_at = await instance.createDayToExpire();
        instance.created_at = new Date();
        instance.updated_at = new Date();
        return instance;
    }

    private async createDayToExpire(): Promise<Date> {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + this.DAYS_TO_EXPIRE);
        return expirationDate;
    }

    toRegister() {
        return {
            users_id: this.users_id!,
            token: this.token!,
            revoked: this.revoked,
            revoked_at: this.revoked_at!,
            expires_at: this.expires_at!,
            created_at: this.created_at!,
        };
    }
}
