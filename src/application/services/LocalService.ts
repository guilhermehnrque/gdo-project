import { LocalEntity } from "../../domain/entity/LocalEntity";
import { Local } from "../../domain/models/LocalModel";
import { LocalRepositoryImpl } from "../../infrastructure/repositories/LocalRepositoryImpl";
import LocalNotFoundError from "../erros/local/LocalNotFoundError";

export class LocalService {

    private localRepository: LocalRepositoryImpl;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
    }

    private async getLocalById(id: number): Promise<Local | null | undefined> {
        return await this.localRepository.getLocalByIdPk(id);
    }

    async ensureLocalDoesNotExist(localId: number): Promise<void> {
        const local = await this.getLocalById(localId);

        if (!local || local === undefined) {
            throw new LocalNotFoundError();
        }
    }

    private async getLocalByDescription(description: string): Promise<Local | null | undefined> {
        return this.localRepository.getLocalByDescription(description);
    }

    async ensureLocalExistsAndReturnIfExists(description: string): Promise<LocalEntity | null> {
        const local = await this.getLocalByDescription(description);

        if (!local || local === undefined) {
            return null;
        }

        return await LocalEntity.fromService(local);
    }

    async getLocalByIdPk(id: number): Promise<LocalEntity> {
        const local = await this.getLocalById(id);

        if (!local || local === undefined) {
            throw new LocalNotFoundError();
        }

        return await LocalEntity.fromService(local);
    }

    async getGroupLocalsByGroupId(groupId: number): Promise<LocalEntity[]> {
        const locals = await this.localRepository.getLocalsByGroupId(groupId);

        if (!locals || locals === undefined) {
            throw new LocalNotFoundError();
        }

        const localsEntities = await Promise.all(
            locals.map(async (local) => {
                return await LocalEntity.fromService(local);
            })
        );

        return localsEntities;

    }

}