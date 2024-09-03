import { GuestEntity } from "../../domain/entity/GuestEntity";
import { GuestRepositoryImpl } from "../../infrastructure/repositories/GuestRepositoryImpl";

export class GuestService {

    private guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async getGuestById(guestId: number): Promise<GuestEntity> {
        const guest = await this.guestRepository.getGuestById(guestId);

        if (!guest || guest == null) {
            throw new Error("Guest not found");
        }

        return await GuestEntity.createFromPayload(guest);
    }
}