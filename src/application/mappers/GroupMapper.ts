import { Group } from '../../domain/models/GroupModel';
import { Local } from '../../domain/models/LocalModel';
import { LocalDTO } from '../dto/local/LocalDTO';
import { GroupDTO } from '../dto/group/GroupDTO';

function mapLocalToDTO(local: Local): LocalDTO {
    return new LocalDTO(
        local.id,
        local.country,
        local.state,
        local.city,
        local.street,
        local.zip_code,
        local.number ?? 0,
        local.description,
        local.groups_id,
        local.created_at.toISOString(),
        local.updated_at?.toISOString() ?? ''
    );
}

export function mapGroupToDTO(group: Group): GroupDTO {
    return new GroupDTO(
        group.id,
        group.description,
        group.is_active,
        group.users_id,
        group.created_at.toISOString(),
        group.updated_at?.toISOString() ?? '',
        mapLocalToDTO(group.local!)
    );
}