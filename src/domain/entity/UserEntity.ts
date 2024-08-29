import { v4 as uuidv4 } from 'uuid';
import HashPassword from '../../infrastructure/configs/HashPassword';
import { booleanToTinyInt } from '../../application/utils/BooleanUtils';
import { RegisterUserRequest } from '../../infrastructure/requests/auth/RegisterUserRequest';

class UserEntity {
    user_id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
    status: boolean;
    phone_number: number;
    login: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;

    constructor(
        user_id: string, 
        name: string,
        surname: string,
        email: string,
        type: string,
        status: boolean,
        phone_number: number,
        login: string,
        password: string,
        created_at?: Date,
        updated_at?: Date,
        deleted_at?: Date | null
    ) {
        this.user_id = user_id; 
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.type = type;
        this.status = status;
        this.phone_number = phone_number;
        this.login = login;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }

    static async createFromPayload(payload: RegisterUserRequest, status: boolean): Promise<UserEntity> {
        const password = await HashPassword.hashPassword(payload.password);
        const userId = uuidv4(); 

        return new UserEntity(
            userId,
            payload.name,
            payload.surname,
            payload.email,
            payload.type.toString(),
            status,
            payload.phone_number,
            payload.login,
            password
        );
    }
}

export default UserEntity;
