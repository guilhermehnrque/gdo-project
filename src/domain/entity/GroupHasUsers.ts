export class GroupHasUsers {
    public id?: number | null;
    public groups_id: number;
    public users_id: number;

    constructor(
        groups_id: number,
        users_id: number,
        id?: number | null
    ) {
        this.id = id;
        this.groups_id = groups_id;
        this.users_id = users_id;
    }

    static async createFromPayload(groups_id: number, users_id: number): Promise<GroupHasUsers> {
        return new GroupHasUsers(
            groups_id,
            users_id
        );
    }

    toRegister() {
        return {
            groups_id: this.groups_id,
            users_id: this.users_id
        }
    }
}
