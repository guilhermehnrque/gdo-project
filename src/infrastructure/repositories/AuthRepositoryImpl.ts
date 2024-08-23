import { AuthRepository } from "../../domain/repositories/AuthRepository";
import UserEntity from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { injectable } from 'tsyringe';
import { Op } from "sequelize";

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

    getUserByEmail(email: string): Promise<UserModel | null>{
        return UserModel.findOne({
            where: {
                email,
            },
        });
    }

    getUserByToken(token: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                reset_password_token: token,
                reset_password_expires: { [Op.gt]: new Date() }
            },
        });
    }

    save(user: UserModel): Promise<UserModel> {
        return user.save();
    }
    
}

export default AuthRepositoryImpl;