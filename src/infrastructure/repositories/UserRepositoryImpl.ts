import { AuthRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";
import UserEntity from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { Op } from "sequelize";
import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import JwtToken from "../../domain/models/JwtTokenModel";

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

    async getUserByLogin(login: string): Promise<UserModel | null> {
        try {
            return UserModel.findOne({
                where: {
                    login,
                },
            });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Get user by login -> Error getting user by login: ${customError.message}`);
        }
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

    async getUserByResetPasswordToken(token: string): Promise<UserModel | null> {
        try {
            return UserModel.findOne({
                where: {
                    reset_password_token: token,
                    reset_password_expires: { [Op.gt]: new Date() }
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Get user by token -> Error getting user by token: ${customError.message}`);
        }

    }

    save(user: UserModel): Promise<UserModel> {
        try {
            return user.save();
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Save -> Error saving user: ${customError.message}`);
        }

    }

    getUserByPK(userId: number): Promise<UserModel | null> {
        return UserModel.findOne({ where: { id: userId } });
    }

}

export default UserRepositoryImpl;