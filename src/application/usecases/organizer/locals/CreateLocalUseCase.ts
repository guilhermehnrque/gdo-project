import LocalEntity from "../../../../domain/entity/LocalEntity";
import Local from "../../../../domain/models/LocalModel";
import logger from "../../../../infrastructure/configs/LoggerConfig";
import LocalRepositoryImpl from "../../../../infrastructure/repositories/LocalRepositoryImpl";
import CreateListDTO from "../../../dto/list/CreateListDTO";
import CustomError from "../../../erros/CustomError";
import DatabaseError from "../../../erros/DatabaseError";

export default class CreateLocalUseCase {

    private localRepository: LocalRepositoryImpl;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
    }

    async execute(createListDTO: CreateListDTO, groupId: number, transaction: any): Promise<Local | undefined> {
        const localEntity = await this.createLocalEntity(createListDTO, groupId);
    
        try {
            return await this.localRepository.createLocal(localEntity, { transaction });
        } catch (error) {
            this.logAndThrow(error as CustomError, "[CreateLocalUseCase] Error on database");
        }
        
    }
    
    private async createLocalEntity(createListDTO: CreateListDTO, groupId: number): Promise<LocalEntity> {
        return await LocalEntity.createFromDTO(createListDTO, groupId);
    }
    
    private logAndThrow(error: CustomError, context: string): void {
        logger.error(`[${error.name}] ${error.message} -> ${context}`);
        throw new DatabaseError(context + " -> " + error.message);
    }
}