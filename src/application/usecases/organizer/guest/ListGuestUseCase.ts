import { GuestRepositoryImpl } from "../../../../infrastructure/repositories/GuestRepositoryImpl";
import { GuestDTO } from "../../../dto/organizer/guest/GuestDTO";

export class ListGuestUseCase {

    private guestRepository: GuestRepositoryImpl;

    constructor() {
        this.guestRepository = new GuestRepositoryImpl();
    }

    public async getAllGuestsByListId(listId: number): Promise<GuestDTO[]> {
        const guests = await this.guestRepository.getAllGuestsByListId(listId);

        return guests.map(guest => {
            return new GuestDTO({
                name: guest.name,
                listId: guest.lists_id,
                id: guest.id
            });
        });
    }


}