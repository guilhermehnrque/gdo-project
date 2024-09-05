import { Transaction } from "sequelize/types/transaction";
import { LocalEntity } from "../entity/LocalEntity";
import { Local } from "../models/LocalModel";

export default interface LocalRepositoryInterface {
    createLocal(localEntity: LocalEntity, options: any): Promise<Local | undefined>;
    getLocalByIdPk(id: number): Promise<Local | null | undefined>;
    getLocalByDescription(description: string): Promise<Local | null | undefined>;
    updateLocal(localEntity: LocalEntity, options: { transaction: Transaction }): Promise<number | undefined>;
}