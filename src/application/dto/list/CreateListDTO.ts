import { CreateGroupRequest } from "../../../infrastructure/requests/group/CreateGroupRequest";

export default class CreateListDTO {
    public country: string;
    public state: string;
    public city: string;
    public street: string;
    public number: number;
    public zip_code: number;
    public description: string;

    constructor(
        country: string,
        state: string,
        city: string,
        street: string,
        number: number,
        zip_code: number,
        description: string
    ) {
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
        this.number = number;
        this.zip_code = zip_code;
        this.description = description;
    }

    static async createFromPayload(payload: CreateGroupRequest): Promise<CreateListDTO> {
        return new CreateListDTO(
            payload.local.country,
            payload.local.state,
            payload.local.city,
            payload.local.street,
            payload.local.number,
            payload.local.zip_code,
            payload.local.description
        );
    }

    payloadToCreate() {
        return {
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            number: this.number,
            zip_code: this.zip_code,
            description: this.description
        };
    }
}