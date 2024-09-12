import { PlayersListService } from "../../../services/PlayersListService";
import { mapPlayerLists } from "../../../mappers/organizer/PlayersListDetailMapper";
import { PlayersListDTO } from "../../../dto/organizer/playersList/PlayersListDTO";
import { UserService } from "../../../services/UserService";
import { ListService } from "../../../services/organizer/ListService";
import { GroupService } from "../../../services/GroupService";

export class GetListOfPlayersUseCase {

    private userService: UserService;
    private listService: ListService;
    private groupService: GroupService;
    private playersListService: PlayersListService;

    constructor() {
        this.userService = new UserService();
        this.listService = new ListService();
        this.groupService = new GroupService();
        this.playersListService = new PlayersListService();

    }

    async execute(userId: string, groupId: number): Promise<PlayersListDTO[]> {
        const organizerId = await this.getOrganizerUserByUserId(userId);

        const groups = await this.groupService.getOrganizerGroupsByUserIdPk(organizerId.id);
        const groupsId = groups.map(group => group.id!);

        const list = await this.listService.getListsByGroupsIds(groupsId);
        const listsId = list.map(list => list.id!);

        const playersList = await this.playersListService.getListOfPlayersByListOfIds(listsId);

        return mapPlayerLists(playersList, list);

    }

    async getOrganizerUserByUserId(userId: string): Promise<any> {
        return await this.userService.getUserAndCheckIfUserIsOrganizer(userId);
    }

}