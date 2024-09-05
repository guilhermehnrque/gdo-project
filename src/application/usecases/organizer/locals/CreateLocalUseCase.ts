import { LocalEntity } from "../../../../domain/entity/LocalEntity";
import { Local } from "../../../../domain/models/LocalModel";
import { LocalRepositoryImpl } from "../../../../infrastructure/repositories/LocalRepositoryImpl";
import { CreateLocalDTO } from "../../../dto/local/CreateLocalDTO";
import { Transaction } from "sequelize";
import { LocalService } from "../../../services/LocalService";

export default class CreateLocalUseCase {

    private localRepository: LocalRepositoryImpl;
    private localService: LocalService;

    constructor() {
        this.localRepository = new LocalRepositoryImpl();
        this.localService = new LocalService();
    }

    async execute(CreateLocalDTO: CreateLocalDTO, groupId: number, transaction: Transaction): Promise<void> {
        let localEntity: LocalEntity | undefined;
        const local = await this.localService.ensureLocalExistsAndReturnIfExists(CreateLocalDTO.description);

        if (local) {
            CreateLocalDTO.setGroupsId(groupId)
            localEntity = await this.prepareLocalEntity(CreateLocalDTO, groupId);
        }

        localEntity = await this.prepareLocalEntity(CreateLocalDTO, groupId);
        await this.createLocal(localEntity, transaction);
    }

    private async createLocal(localEntity: LocalEntity, transaction: Transaction): Promise<Local | undefined> {
        return await this.localRepository.createLocal(localEntity, { transaction });
    }

    private async prepareLocalEntity(CreateLocalDTO: CreateLocalDTO, groupId: number): Promise<LocalEntity> {
        return await LocalEntity.createFromDTO(CreateLocalDTO, groupId);
    }


}