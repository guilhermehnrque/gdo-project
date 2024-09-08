import { v4 as uuidv4 } from 'uuid';
import { HashPassword } from '../../application/utils/HashPassword';
import { UserAttributes } from '../interfaces/attributes/UserAttributes';

export class UserEntity implements UserAttributes {
    public id: number;
    public user_id: string;
    public name: string;
    public surname: string;
    public email: string;
    public type: string;
    public status: boolean;
    public phone_number: number;
    public login: string;
    public password: string;
    public created_at: Date;
    public updated_at: Date;
    public deleted_at: Date | undefined;
    public reset_password_expires?: Date | null | undefined;
    public reset_password_token?: string | null | undefined;

    constructor(payload: Partial<UserEntity>) {
        this.user_id = payload.user_id!;
        this.name = payload.name!;
        this.surname = payload.surname!;
        this.email = payload.email!;
        this.type = payload.type!;
        this.status = payload.status!;
        this.phone_number = payload.phone_number!;
        this.login = payload.login!;
        this.password = payload.password!;
        this.created_at = payload.created_at!;
        this.updated_at = payload.updated_at!;
        this.deleted_at = payload.deleted_at!;
        this.id = payload.id ?? 0;
        this.reset_password_expires = payload.reset_password_expires;
        this.reset_password_token = payload.reset_password_token;
    }

    static async createFromUseCase(payload: Partial<UserEntity>): Promise<UserEntity> {
        payload.password = await HashPassword.hashPassword(payload.password!);
        payload.user_id = uuidv4();

        return new UserEntity({
            ...payload
        });
    }

    static async createFromRepository(payload: Partial<UserEntity>): Promise<UserEntity> {
        return new UserEntity({
            ...payload
        });
    }

    public async hashNewPassword(newPassword: string) {
        this.password = await HashPassword.hashPassword(newPassword);
    }

    public async cleanTokens() {
        this.reset_password_token = null;
        this.reset_password_expires = null;
    }

    public toRegister() {
        return {
            name: this.name,
            surname: this.surname,
            email: this.email,
            type: this.type,
            status: this.status,
            phone_number: this.phone_number,
            login: this.login,
            password: this.password,
            user_id: this.user_id
        }
    }

    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            type: this.type,
            status: this.status,
            phone_number: this.phone_number,
            login: this.login,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at
        }
    }
}
