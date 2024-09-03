import { Request, Response } from "express";
import CustomError from "../../../application/erros/CustomError";
import { GuestFacade } from "../../../application/facade/organizer/GuestFacade";

export class GuestController {

    private guestFacade: GuestFacade;

    constructor(){
        this.guestFacade = new GuestFacade();
    }

    public async registerGuest(request: Request, response: Response): Promise<Response> {
        try {
            const { name, listId } = request.body;

            await this.guestFacade.registerGuest(name, listId);
            return response.status(201).json({ message: "Guest registered" });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async deleteGuest(request: Request, response: Response): Promise<Response> {
        try {
            const guestId = parseInt(request.params.guestId);

            const res = await this.guestFacade.deleteGuest(guestId);
            return response.status(204).json({ deleted: res });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateGuest(request: Request, response: Response): Promise<Response> {
        try {
            const guestId = parseInt(request.params.guestId);
            const { name, listId } = request.body;

            const res = await this.guestFacade.updateGuest(guestId, name, listId);
            return response.status(204).json({ updated: res });
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getAllGuestsByListId(request: Request, response: Response): Promise<Response> {
        try {
            const listId = parseInt(request.params.listId);

            const res = await this.guestFacade.getAllGuestsByListId(listId);
            return response.status(200).json(res);
        } catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }
}