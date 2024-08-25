import GroupRepositoryImpl from "../../../infrastructure/repositories/GroupRepositoryImpl";
import GroupEntity from "../../../domain/entity/GroupEntity";
import UserRepositoryImpl from "../../../infrastructure/repositories/UserRepositoryImpl";
import Group from "../../../domain/models/GroupModel";
import CustomError from "../../erros/CustomError";
import logger from "../../../infrastructure/configs/LoggerConfig";
import { User } from "../../../domain/models/UserModel";
import DatabaseError from "../../erros/DatabaseError";
import UserNotStaffError from "../../erros/groups/UserNotStaffError";
import GroupAlreadyExistsError from "../../erros/groups/GroupAlreadyExistsError";
import CreateGroupDTO from "../../dto/group/CreateGroupDTO";

export default class CreateGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }

    async execute(createGroupDTO: CreateGroupDTO, userId: string, transaction: any): Promise<Group> {
        const user = await this.userValidateIsStaffAndExists(userId);
        await this.groupValidateExists(createGroupDTO.description);

        const groupEntity = GroupEntity.createFromDTO(createGroupDTO, user.id);

        try {
            return await this.groupRepository.createGroup(await groupEntity, { transaction });
        }
        catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError("[CreateGroupUseCase] Error on database -> " + customError.message);
        }
    }

    private async userValidateIsStaffAndExists(userId: string): Promise<User> {
        const user = await this.userRepository.getUserByUserId(userId);

        if (!user && user!.is_staff === 0) {
            throw new UserNotStaffError("[CreateGroupUseCase] Usuário não permitido para executar essa operação");
        }

        return user!;
    }

    private async groupValidateExists(description: string): Promise<void> {
        const group = await this.groupRepository.getGroupByDescription(description);

        if (group) {
            throw new GroupAlreadyExistsError("[CreateGroupUseCase] Grupo já registrado");
        }

    }

    logAndThrow(error: CustomError, context: string): void {
        logger.error(`[${error.name}] ${error.message} -> ${context}`)
        throw error
    }

}
