import { CustomError } from "../../application/erros/CustomError";
import DatabaseError from "../../application/erros/DatabaseError";
import { GuestEntity } from "../../domain/entity/GuestEntity";
import { Guest } from "../../domain/models/GuestModel";
import { GuestRepositoryInterface } from "../../domain/repositories/GuestRepositoryInterface";

export class GuestRepositoryImpl implements GuestRepositoryInterface {

    async register(guestEntity: GuestEntity): Promise<Guest> {
        try {
            return await Guest.create(guestEntity.toRegister());
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error creating guest: ${customError.message}`);
        }
    }

    async delete(guestId: number): Promise<number> {
        try {
            return await Guest.destroy({ where: { id: guestId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error deleting guest: ${customError.message}`);
        }
    }

    async getAllGuestsByListId(listId: number): Promise<Guest[]> {
        try {
            return await Guest.findAll({ where: { lists_id: listId } });
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error getting all guests by list id: ${customError.message}`);
        }

    }

    async getGuestById(guestId: number): Promise<Guest | null> {
        try {
            return await Guest.findByPk(guestId);
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error getting guest by id: ${customError.message}`);
        }
    }

    async updateGuestById(guestId: number, guestEntity: GuestEntity): Promise<number> {
        try {
            const [rowsAffected] = await Guest.update(guestEntity.toUpdate(), { where: { id: guestId, lists_id: guestEntity.lists_id } });
            return rowsAffected;
        } catch (error) {
            const customError = error as CustomError;
            throw new DatabaseError(`[GuestRepositoryImpl] Error updating guest by id: ${customError.message}`);
        }
    }

}
