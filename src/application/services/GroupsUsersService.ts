import { GroupUserRepositoryImpl } from "../../infrastructure/repositories/GroupUserRepositoryImpl";
import { PlayerAlreadyInGroup } from "../erros/players/PlayersErros";

export class GroupsUsersService {

    private groupUserRepository: GroupUserRepositoryImpl;

    constructor() {
        this.groupUserRepository = new GroupUserRepositoryImpl();
    }

    async ensureUserIsNotInGroup(userId: number, groupId: number): Promise<void> {
        const userIsInGroup = await this.groupUserRepository.checkIfUserIsInGroup(userId, groupId);

        if (userIsInGroup) {
            throw new PlayerAlreadyInGroup();
        }
    }
}