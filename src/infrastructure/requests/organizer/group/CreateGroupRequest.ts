export interface CreateGroupRequest {
    group: {
        description: string;
    };
    local: {
        country: string;
        state: string;
        city: string;
        street: string;
        number: number;
        zip_code: number;
        description: string;
    };
}