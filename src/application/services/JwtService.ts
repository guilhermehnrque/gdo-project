import { JwtTokensRepositoryImpl } from "../../infrastructure/repositories/JwtTokensRepositoryImpl";
import { JwtTokenEntity } from "../../domain/entity/JwtTokenEntity";
import HashPassword from '../../infrastructure/configs/HashPassword';

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

    async checkPassword(password: string, hash: string, login: string): Promise<boolean> {
        return await HashPassword.comparePassword(password, hash);
    }

    async expireLatestToken(userIdPk: number): Promise<void> {
        return await this.jwtRepository.expireLatestToken(userIdPk);
    }

    async getLatestValidToken(userIdPk: number): Promise<string | null | undefined> {
        return await this.jwtRepository.getLatestValidToken(userIdPk);
    }

}
