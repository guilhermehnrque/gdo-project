import { JwtTokensRepositoryImpl } from "../../infrastructure/repositories/JwtTokensRepositoryImpl";
import { JwtTokenEntity } from "../entity/JwtTokenEntity";
import Jwt from '../../infrastructure/configs/Jwt';

interface JSONConvertible {
    toJSON(): any;
}

export class JwtService {

    private jwtRepository: JwtTokensRepositoryImpl;

    constructor() {
        this.jwtRepository = new JwtTokensRepositoryImpl();
    }

    async saveToken(users_id: number, token: string): Promise<boolean> {
        const jwtEntity = await JwtTokenEntity.createFromPayload(users_id, token);

        return this.jwtRepository.saveToken(jwtEntity);
    }

    async createToken<T extends JSONConvertible>(data: T): Promise<string> {
        const payload = data.toJSON();
        return await Jwt.generateToken(payload);
    }

}
