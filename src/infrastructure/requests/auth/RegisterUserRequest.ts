import { UserTypes } from "../../../domain/enums/UserTypes";

export interface RegisterUserRequest {
    name: string;
    surname: string;
    email: string;
    type: UserTypes;
    status: number;
    is_staff: boolean;
    login: string;
    password: string;
    phone_number: number;
}
