import { CreateGroupRequest } from "../../../infrastructure/requests/organizer/group/CreateGroupRequest";

export default class CreateGroupDTO {
    
    public description: string;

    constructor(
        description: string,
    ) {
        this.description = description;
    }

    static async createFromPayload(payload: CreateGroupRequest): Promise<CreateGroupDTO> {
        return new CreateGroupDTO(
            payload.group.description,
        );
    }

    payloadToCreate() {
        return {
            description: this.description,
        };
    }
}