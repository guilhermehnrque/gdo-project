import LocalEntity from "../entity/LocalEntity";
import { Local } from "../models/LocalModel";

export default interface LocalRepositoryInterface {
    createLocal(localEntity: LocalEntity, options: any): Promise<Local | undefined>;
    getLocalByIdPk(id: number): Promise<Local | null| undefined>;
    /*
    getLocalById(): Promise<any>;
    updateLocalById(): Promise<any>;
    changeLocalStatus(): Promise<any>;
    deleteLocalById(): Promise<any>;
    addUserToLocal(): Promise<any>;
    removeUserFromLocal(): Promise<void>;
    getLocalByDescription(localDescription: string): Promise<boolean>;*/
}