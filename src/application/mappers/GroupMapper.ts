import { LocalDTO } from '../dto/local/LocalDTO';
import { GroupDTO } from '../dto/group/GroupDTO';
import { GroupEntity } from '../../domain/entity/GroupEntity';
import { LocalEntity } from '../../domain/entity/LocalEntity';

function mapLocalToDTO(local: LocalEntity): LocalDTO {
    return new LocalDTO({ ...local });
}

export async function mapGroupWithLocalToDTO(group: GroupEntity, localEntity: LocalEntity): Promise<GroupDTO> {
    return new GroupDTO({
        ...group,
        local: mapLocalToDTO(localEntity) ?? null
    });
}

export async function mapGroupWithoutLocalToDTO(group: GroupEntity): Promise<GroupDTO> {
    return GroupDTO.withoutLocalFromEntity({
        id: group.id,
        description: group.description,
        is_active: group.is_active,
        users_id: group.users_id,
        created_at: group.created_at,
        updated_at: group.updated_at
    });
}
