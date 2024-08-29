import { GroupVisibilityEnum, getGroupVisibility } from "../../../domain/enums/GroupVisibilityEnum";
import { CreateGroupRequest } from "../../../infrastructure/requests/organizer/group/CreateGroupRequest";

export default class CreateGroupDTO {
    
    public description: string;
    public visibility: GroupVisibilityEnum

    constructor(
        description: string,
        visibility: GroupVisibilityEnum
    ) {
        this.description = description;
        this.visibility = visibility;
    }

    static async createFromPayload(payload: CreateGroupRequest): Promise<CreateGroupDTO> {
        return new CreateGroupDTO(
            payload.group.description,
            getGroupVisibility(payload.group.visibility)
        );
    }



    payloadToCreate() {
        return {
            description: this.description,
        };
    }
}