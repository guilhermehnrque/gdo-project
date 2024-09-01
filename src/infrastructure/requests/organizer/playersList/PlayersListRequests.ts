export interface PlayersListCreateRequest {
    listId: number;
    playersId: number[];
    playerStatus: string;
}

export interface PlayersListUpdateRequest {
    listId: number;
    playerId: number;
    playerStatus: string;
}

export interface PlayersListGetRequest {
    playerId: number;
    listId: number;
}

export interface PlayersListRemoveRequest {
    listId: number;
    playerId: number;
}