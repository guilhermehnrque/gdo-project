import UserRepositoryImp from "../../../../infrastructure/repositories/UserRepositoryImpl";
import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import UserRepositoryImpl from "../../../../infrastructure/repositories/UserRepositoryImpl";
import { error } from "console";

export default class RegisterUseToGroupUseCase {

    private userRepository: UserRepositoryImpl;
    private groupRepository: GroupRepositoryImpl;

    constructor() {
        this.userRepository = new UserRepositoryImpl();
        this.groupRepository = new GroupRepositoryImpl();
    }

    async execute(userId: string, groupId: string): Promise<void> {
        throw Error("Method not implemented.");
    }

}