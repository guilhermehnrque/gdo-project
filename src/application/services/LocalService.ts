import { Local } from "../../domain/models/LocalModel";
import LocalRepositoryImpl from "../../infrastructure/repositories/LocalRepositoryImpl";
import LocalNotFoundError from "../erros/local/LocalNotFoundError";

export class LocalService {

    private localRepository: LocalRepositoryImpl;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
    }

    async getLocalById(id: number): Promise<Local | null | undefined> {
        return await this.localRepository.getLocalByIdPk(id);
    }

    async ensureLocalDoesNotExist(localId: number): Promise<void> {
        const local = await this.getLocalById(localId);

        if (!local || local === undefined) {
            throw new LocalNotFoundError();
        }
    }

}