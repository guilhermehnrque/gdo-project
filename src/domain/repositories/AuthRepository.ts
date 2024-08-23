import UserEntity from '../entity/UserEntity';
import { User as UserModel } from '../models/UserModel';

export interface AuthRepository {
    create(user: UserEntity): Promise<UserModel>;
    getUserByLogin(login: string): Promise<UserModel | null>;
    getUserById(user_id: number): Promise<UserModel | null>;
    getUserByEmail(email: string): Promise<UserModel | null>;
    save(user: UserModel): Promise<UserModel>;
    getUserByToken(token: string): Promise<UserModel | null>;
}
