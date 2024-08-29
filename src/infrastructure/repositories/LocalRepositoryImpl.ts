import CustomError from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import LocalEntity from "../../domain/entity/LocalEntity";
import { Local } from "../../domain/models/LocalModel";
import LocalRepositoryInterface from "../../domain/repositories/LocalRepositoryInterface";

export default class LocalRepositoryImpl implements LocalRepositoryInterface {

    async createLocal(localEntity: LocalEntity, options: { transaction?: any }): Promise<Local> {
        try {
            return await Local.create(localEntity.payloadToCreate(), { transaction: options.transaction });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GroupRepositoryImpl] Error creating group: ${customError.message}`);
        }

    }

}