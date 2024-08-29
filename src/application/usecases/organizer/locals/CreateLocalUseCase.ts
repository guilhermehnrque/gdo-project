import LocalEntity from "../../../../domain/entity/LocalEntity";
import { Local } from "../../../../domain/models/LocalModel";
import logger from "../../../../infrastructure/configs/LoggerConfig";
import LocalRepositoryImpl from "../../../../infrastructure/repositories/LocalRepositoryImpl";
import CreateLocalDTO from "../../../dto/local/CreateLocalDTO";
import CustomError from "../../../erros/CustomError";
import DatabaseError from "../../../erros/DatabaseError";

export default class CreateLocalUseCase {

    private localRepository: LocalRepositoryImpl;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
    }

    async execute(CreateLocalDTO: CreateLocalDTO, groupId: number, transaction: any): Promise<Local | undefined> {
        const localEntity = await this.createLocalEntity(CreateLocalDTO, groupId);

        try {
            return await this.localRepository.createLocal(localEntity, { transaction });
        } catch (error) {
            this.logAndThrow(error as CustomError, "[CreateLocalUseCase] Error on database");
        }

    }

    private async createLocalEntity(CreateLocalDTO: CreateLocalDTO, groupId: number): Promise<LocalEntity> {
        return await LocalEntity.createFromDTO(CreateLocalDTO, groupId);
    }

    private logAndThrow(error: CustomError, context: string): void {
        logger.error(`[${error.name}] ${error.message} -> ${context}`);
        throw new DatabaseError(context + " -> " + error.message);
    }
}