import UserEntity from '../entity/UserEntity';
import { User as UserModel } from '../models/UserModel';

export interface AuthRepositoryInterface {
    create(user: UserEntity): Promise<UserModel>;
    getUserByLogin(login: string): Promise<UserModel | null>;
    getUserByUserId(user_id: string): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    save(user: UserModel): Promise<UserModel>;
    getUserByResetPasswordToken(token: string): Promise<UserModel | null>;
    getUserByPK(userId: number): Promise<UserModel | null>;
    getUserByLoginEmailOrPhone(login: string, email: string, phoneNumber: number): Promise<UserModel | null>
}
