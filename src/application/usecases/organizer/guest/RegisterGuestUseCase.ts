import { GuestEntity } from "../../../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../../../infrastructure/repositories/GuestRepositoryImpl";

export class RegisterGuestUseCase {

    private guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async execute(name: string, listId: number): Promise<void> {
        const guestEntity = await GuestEntity.createFromPayload({ name, lists_id: listId });

        await this.guestRepository.delete(guestEntity.id!);
    }
}
