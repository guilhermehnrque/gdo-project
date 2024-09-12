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
    params: {
        groupId: number;
    }[];
    query: {

    };
    [key: string]: any;
}

export interface PlayersListRemoveRequest {
    params: {
        listId: number;
        playerId: number;
    }[];
    query: {

    };
    [key: string]: any;
}