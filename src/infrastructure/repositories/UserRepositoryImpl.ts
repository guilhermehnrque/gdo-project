import { AuthRepositoryInterface } from "../../domain/repositories/UserRepositoryInterface";
import { UserEntity } from "../../domain/entity/UserEntity";
import { User as UserModel } from "../../domain/models/UserModel";
import { Op } from "sequelize";
import { CustomError } from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";

export class UserRepositoryImpl implements AuthRepositoryInterface {

    async create(userEntity: UserEntity): Promise<UserModel> {
        try {
            const user = UserModel.build(userEntity.toRegister());
            return await user.save();
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] create -> Error creating group: ${customError.message}`);
        }
    }

    async getUserByLoginEmailOrPhone(login: string, email: string, phoneNumber: number): Promise<UserModel | null> {
        try {
            return UserModel.findOne({
                where: {
                    [Op.or]: [
                        { login },
                        { email },
                        { phone_number: phoneNumber },
                    ],
                },
            });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByLoginEmailOrPhone -> Error getting user by login, email or phone: ${customError.message}`);
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
            console.log(error);
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByLogin -> Error getting user by login: ${customError.message}`);
        }
    }

    async getUserByUserId(userId: string): Promise<UserModel | null> {
        return UserModel.findOne({
            where: {
                user_id: userId,
            }
        });
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
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

    async updateUser(user: UserEntity): Promise<number> {
        try {
            const [affectedCount] = await UserModel.update(user, {
                where: {
                    id: user.id,
                }
            });

            return affectedCount;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] Save -> Error saving user: ${customError.message}`);
        }

    }

    async getUserByPK(userId: number): Promise<UserModel | null> {
        try {
            return UserModel.findOne({ where: { id: userId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[UserRepository] getUserByPK -> Error getting user by PK: ${customError.message}`);
        }

    }

}