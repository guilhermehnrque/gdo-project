import { AuthRepository } from "../../domain/repositories/AuthRepository";
import UserEntity from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { injectable } from 'tsyringe';

@injectable()
class AuthRepositoryImpl implements AuthRepository {
    create(userEntity: UserEntity): Promise<UserModel> {
        const user = UserModel.build(userEntity);
        return user.save();
    }

    getUserByLogin(login: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                login,
            },
        });
    }

    getUserById(user_id: number): Promise<UserModel | null> {
        throw new Error("Method not implemented.");
    }
    
}

export default AuthRepositoryImpl;