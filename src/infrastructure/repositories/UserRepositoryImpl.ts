import { AuthRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";
import UserEntity from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { Op } from "sequelize";

class UserRepositoryImpl implements AuthRepositoryInterface {
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

    getUserByUserId(userId: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                user_id: userId,
            }
        });
    }

    getUserByEmail(email: string): Promise<UserModel | null> {
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

    getUserByPK(userId: number): Promise<UserModel | null> {
        return UserModel.findOne({ where: { id: userId } });
    }

}

export default UserRepositoryImpl;