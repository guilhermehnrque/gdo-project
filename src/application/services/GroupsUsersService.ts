import { GroupUserRepositoryImpl } from "../../infrastructure/repositories/GroupUserRepositoryImpl";
import { PlayerAlreadyInGroup } from "../erros/players/PlayersErros";
import { GroupHasUsers } from "../../domain/entity/GroupHasUsers";
import { GroupsUsers } from "../../domain/models/GroupUserModel";

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

    async getGroupUsers(groupId: number) {
        const userGroups = await this.groupUserRepository.getAllGroupMembers(groupId);

        if (!userGroups || userGroups.length === 0) {
            throw new Error('User has no groups');
        }

        return this.createEntities(userGroups);
    }

    async createEntities(userGroups: Array<GroupsUsers>): Promise<GroupHasUsers[]> {
        return Promise.all(userGroups.map(userGroup => {
            return GroupHasUsers.createFromDatabase(
                userGroup.groups_id,
                userGroup.users_id,
                userGroup.id
            );
        }));
    }
}