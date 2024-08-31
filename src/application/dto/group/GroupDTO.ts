import { LocalDTO } from '../local/LocalDTO';

export class GroupDTO {
  constructor(
    public id: number,
    public description: string,
    public is_active: boolean,
    public users_id: number,
    public created_at: string,
    public updated_at: string,
    public local: LocalDTO
  ) {}
}