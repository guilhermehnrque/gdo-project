import GroupRepositoryImpl from "../../../../infrastructure/repositories/GroupRepositoryImpl";
import UserRepositoryImpl from "../../../../infrastructure/repositories/UserRepositoryImpl";
import { User } from "../../../../domain/models/UserModel";
import GroupEntity from "../../../../domain/entity/GroupEntity";
import Group from "../../../../domain/models/GroupModel";
import CustomError from "../../../erros/CustomError";
import logger from "../../../../infrastructure/configs/LoggerConfig";
import DatabaseError from "../../../erros/DatabaseError";
import UserNotStaffError from "../../../erros/groups/UserNotStaffError";
import GroupAlreadyExistsError from "../../../erros/groups/GroupAlreadyExistsError";
import CreateGroupDTO from "../../../dto/group/CreateGroupDTO";
import { UserTypes } from "../../../../domain/enums/UserTypes";

export default class CreateGroupUseCase {

    private groupRepository: GroupRepositoryImpl;
    private userRepository: UserRepositoryImpl;

    constructor() {
        this.groupRepository = new GroupRepositoryImpl();
        this.userRepository = new UserRepositoryImpl();
    }
    
    async execute(createGroupDTO: CreateGroupDTO, userId: string, transaction: any): Promise<Group> {
        try {
            const user = await this.validateUserAndGroup(createGroupDTO, userId);
            const groupEntity = await this.createGroupEntity(createGroupDTO, user.id);
            return await this.createGroup(groupEntity, transaction);
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }
    
    private async validateUserAndGroup(createGroupDTO: CreateGroupDTO, userId: string): Promise<User> {
        const user = await this.userValidateIsStaffAndExists(userId);
        await this.groupValidateExists(createGroupDTO.description);
        return user;
    }
    
    private async userValidateIsStaffAndExists(userId: string): Promise<User> {
        const user = await this.userRepository.getUserByUserId(userId);
    
        if (!user || user.type === UserTypes.STAFF) {
            throw new UserNotStaffError("[CreateGroupUseCase] Usuário não permitido para executar essa operação");
        }
    
        return user;
    }
    
    private async groupValidateExists(description: string): Promise<void> {
        const group = await this.groupRepository.getGroupByDescription(description);
    
        if (group) {
            throw new GroupAlreadyExistsError("[CreateGroupUseCase] Grupo já registrado");
        }
    }
    
    private createGroupEntity(createGroupDTO: CreateGroupDTO, userId: number): Promise<GroupEntity> {
        return GroupEntity.createFromDTO(createGroupDTO, userId);
    }
    
    private async createGroup(groupEntity: GroupEntity, transaction: any): Promise<Group> {
        return await this.groupRepository.createGroup(groupEntity, { transaction });
    }
    
    private handleDatabaseError(error: unknown): never {
        const customError = error as CustomError;
        throw new DatabaseError("[CreateGroupUseCase] Error on database -> " + customError.message);
    }
    
    logAndThrow(error: CustomError, context: string): void {
        logger.error(`[${error.name}] ${error.message} -> ${context}`);
        throw error;
    }
    

}
