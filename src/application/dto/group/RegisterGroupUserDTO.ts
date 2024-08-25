export class RegisterGroupUserDTO {
    constructor(
        public groups_id: number,
        public users_id: number[],
    ) { }

    getUsersId() {
        return this.users_id;
    }
}

