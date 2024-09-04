import { UserTypes } from "../../../domain/enums/UserTypes";

export interface RegisterUserRequest {
    name: string;
    surname: string;
    email: string;
    type: UserTypes;
    login: string;
    password: string;
    phoneNumber: number;
}
