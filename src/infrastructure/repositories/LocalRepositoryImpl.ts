import { Transaction } from "sequelize";
import { CustomError } from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import LocalEntity from "../../domain/entity/LocalEntity";
import { Local } from "../../domain/models/LocalModel";
import LocalRepositoryInterface from "../../domain/repositories/LocalRepositoryInterface";
import logger from "../../application/utils/LoggerConfig";

export default class LocalRepositoryImpl implements LocalRepositoryInterface {

    async createLocal(localEntity: LocalEntity, options: { transaction: Transaction }): Promise<Local | undefined> {
        try {
            return Local.create(localEntity.payloadToCreate(), { transaction: options.transaction });
        } catch (error) {
            this.logAndThrowError(error as CustomError, "[LocalRepositoryImpl] createLocal");
        }
    }

    async getLocalByIdPk(id: number): Promise<Local | null | undefined> {
        try {
            return await Local.findByPk(id);
        } catch (error) {
            this.logAndThrowError(error as CustomError, "[LocalRepositoryImpl] getLocalByIdPk");
        }
    }

    logAndThrowError(error: CustomError, context: string): void {
        logger.error(`${context} error message -> ${error.message}`);

        throw new DatabaseError(`${context}Database error`);
    }

}