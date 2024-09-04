import { JwtToken } from "../../models/JwtTokenModel";

export interface UserAttributes {
    id: number;
    user_id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
    status: boolean;
    login: string;
    password: string;
    phone_number: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    reset_password_token?: string | null;
    reset_password_expires?: Date | null;
    jwt_tokens?: JwtToken;
}