import { GuestEntity } from "../../../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../../../infrastructure/repositories/GuestRepositoryImpl";

export class DeleteGuestUseCase {

    private guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async execute(guestId: number): Promise<number> {
        const guestEntity = await GuestEntity.createFromPayload({id: guestId });

        return await this.guestRepository.delete(guestEntity.id!);
    }
    
}
