import { AuthRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";
import UserEntity from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { Op } from "sequelize";
import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";

class UserRepositoryImpl implements AuthRepositoryInterface {
    async create(userEntity: UserEntity): Promise<UserModel> {
        try {
            const user = UserModel.build(userEntity);
            return await user.save();
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Create -> Error creating group: ${customError.message}`);
        }
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