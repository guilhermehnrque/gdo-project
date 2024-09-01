import { Request, Response } from "express";
import { ListFacade } from "../../../application/facade/organizer/ListFacade";
import { ListUpdateRequest } from "../../requests/organizer/lists/ListUpdateRequest";
import { ListCreateRequest } from "../../requests/organizer/lists/ListCreateRequest";
import CustomError from "../../../application/erros/CustomError";

export class ListController {

    private listFacade: ListFacade;

    constructor() {
        this.listFacade = new ListFacade();
    }

    public async createList(request: Request, response: Response): Promise<Response> {
        try {
            const body = request.body as ListCreateRequest;

            await this.listFacade.createList(body);
            return response.status(201).json({ message: "A lista foi criada" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateListById(request: Request, response: Response) {
        try {
            const body = request.body as ListUpdateRequest;
            const listId = parseInt(request.params.listId);

            const res = await this.listFacade.updateListById(listId, body);
            return response.status(204).json({updated: res});
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updateListStatusById(request: Request, response: Response) {
        try {
            const listId = parseInt(request.params.listId);
            const status = request.body.status;

            const res = await this.listFacade.updateListStatusById(listId, status);
            return response.status(204).json({updated: res});
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getDetailsListById(request: Request, response: Response) {
        try {
            const listId = parseInt(request.params.listId);

            const res = await this.listFacade.getListById(listId);
            return response.status(200).json({ data: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getAllListsByOrganizerId(request: Request, response: Response) {
        try {
            const userId = request.userId as string;

            const res = await this.listFacade.getAllListsByOrganizerId(userId);
            return response.status(201).json({ data: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

}