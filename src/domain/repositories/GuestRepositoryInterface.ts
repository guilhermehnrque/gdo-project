import { Guest } from "../models/GuestModel";
import { GuestEntity } from "../../domain/entity/GuestEntity";

export interface GuestRepositoryInterface {
    register(GuestEntity: GuestEntity): Promise<Guest>;
    delete(guestId: number): Promise<number>;
    getAllGuestsByListId(listId: number): Promise<Guest[]>;
    getGuestById(guestId: number): Promise<Guest | null>;
    updateGuestById(guestId: number, guestEntity: GuestEntity): Promise<number>;
}
