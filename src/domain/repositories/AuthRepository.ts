import UserEntity from '../entity/UserEntity';
import { User as UserModel } from '../models/UserModel';

interface AuthRepository {
    create(user: UserEntity): Promise<UserModel>;
    getUserByLogin(login: string): Promise<UserModel | null>;
    getUserById(user_id: number): Promise<UserModel | null>;
}

export default AuthRepository;
