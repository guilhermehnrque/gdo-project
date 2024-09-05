import { GroupVisibilityEnum, getGroupVisibility } from "../../../domain/enums/GroupVisibilityEnum";

export class CreateGroupDTO {

    public description: string;
    public visibility: GroupVisibilityEnum;

    constructor(payload: { description: string; visibility: string }) {
        this.description = payload.description;
        this.visibility = getGroupVisibility(payload.visibility)
    }

    public payloadToCreate() {
        return {
            description: this.description,
            visibility: this.visibility
        };
    }
}
