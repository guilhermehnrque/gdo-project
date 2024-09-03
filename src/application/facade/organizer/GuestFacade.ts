import { DeleteGuestUseCase } from "../../usecases/organizer/guest/DeleteGuestUseCase";
import { ListGuestUseCase } from "../../usecases/organizer/guest/ListGuestUseCase";
import { RegisterGuestUseCase } from "../../usecases/organizer/guest/RegisterGuestUseCase";
import { UpdateGuestUseCase } from "../../usecases/organizer/guest/UpdateGuestUseCase";

export class GuestFacade {

    private registerUseCase: RegisterGuestUseCase;
    private deleteUseCase: DeleteGuestUseCase;
    private updateUseCase: UpdateGuestUseCase;
    private listUseCase: ListGuestUseCase;

    constructor() {
        this.registerUseCase = new RegisterGuestUseCase();
        this.deleteUseCase = new DeleteGuestUseCase();
        this.updateUseCase = new UpdateGuestUseCase();
        this.listUseCase = new ListGuestUseCase();
    }

    public async registerGuest(name: string, listId: number): Promise<void> {
        this.registerUseCase.execute(name, listId);
    }

    public async deleteGuest(guestId: number): Promise<number> {
        return this.deleteUseCase.execute(guestId);
    }

    public async updateGuest(guestId: number, name: string, listId: number): Promise<number> {
        return this.updateUseCase.execute(guestId, name, listId);
    }

    public async getAllGuestsByListId(listId: number): Promise<any> {
        return this.listUseCase.getAllGuestsByListId(listId);
    }


}