import { GuestEntity } from "../../../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../../../infrastructure/repositories/GuestRepositoryImpl";

export class UpdateGuestUseCase {

    private guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async execute(guestId: number, name: string, listId: number): Promise<number> {
        const guestEntity = await GuestEntity.createFromPayload({ id: guestId, name, lists_id: listId });

        return await this.guestRepository.updateGuestById(guestEntity.id!, guestEntity);
    }
}