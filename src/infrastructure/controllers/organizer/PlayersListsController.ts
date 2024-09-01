import { Request, Response } from "express";
import { PlayersListFacade } from "../../../application/facade/organizer/PlayersListFacade";
import CustomError from "../../../application/erros/CustomError";
import { PlayersListCreateRequest, PlayersListRemoveRequest, PlayersListUpdateRequest, PlayersListGetRequest } from "../../requests/organizer/playersList/PlayersListRequests";

export class PlayersListsController {

    private playersListFacade: PlayersListFacade;

    constructor() {
        this.playersListFacade = new PlayersListFacade();
    }

    public async registerPlayer(request: Request, response: Response): Promise<Response> {
        try {
            const { listId, playersId, playerStatus } = request.body as PlayersListCreateRequest;

            await this.playersListFacade.registerPlayer(listId, playersId, playerStatus);
            return response.status(201).json({ message: "Jogador cadastrado na lista" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async removePlayer(request: Request, response: Response): Promise<Response> {
        try {
            const { listId, playerId } = request.body as PlayersListRemoveRequest;

            await this.playersListFacade.removePlayer(listId, playerId);
            return response.status(200).json({ message: "Jogador removido da lista" });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async updatePlayer(request: Request, response: Response): Promise<Response> {
        try {
            const { listId, playerId, playerStatus } = request.body as PlayersListUpdateRequest;

            const res = await this.playersListFacade.updatePlayer(listId, playerId, playerStatus);
            return response.status(200).json({ updated: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            return response.status(statusCode).json({ error: message });
        }
    }

    public async getPlayerList(request: Request, response: Response): Promise<Response> {
        try {
            const { playerId, listId } = request.params as PlayersListGetRequest;

            const res = await this.playersListFacade.getPlayerList(playerId, listId);
            return response.status(200).json({ data: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;
            console.error(error);
            return response.status(statusCode).json({ error: message });
        }
    }


    public async getPlayerLists(request: Request, response: Response): Promise<Response> {
        try {
            const { playerId } = request.params as PlayersListGetRequest;

            const res = await this.playersListFacade.getPlayerLists(playerId);
            return response.status(200).json({ data: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;

            return response.status(statusCode).json({ error: message });
        }
    }

    public async getAllList(request: Request, response: Response): Promise<Response> {
        try {
            const res = await this.playersListFacade.getAllLists();
            return response.status(200).json({ data: res });
        }
        catch (error) {
            const { statusCode = 500, message } = error as CustomError;

            return response.status(statusCode).json({ error: message });
        }
    }

}
