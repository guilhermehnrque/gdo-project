export interface CreateGroupRequest {
    group: {
        description: string;
        visibility: string;
    };
    
    local: {
        country: string;
        state: string;
        city: string;
        street: string;
        number: number;
        zipCode: number;
        description: string;
    };
}