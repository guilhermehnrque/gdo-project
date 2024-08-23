export interface RegisterUserRequest {
    name: string;
    surname: string;
    email: string;
    type: string;
    status: number;
    is_staff: boolean;
    login: string;
    password: string;
    phone_number: number;
}
