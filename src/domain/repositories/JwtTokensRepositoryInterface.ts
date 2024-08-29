import { JwtTokenEntity } from "../entity/JwtTokenEntity";
import { JwtToken } from "../models/JwtTokenModel";

export interface JwtTokensRepositoryInterface {
    saveToken(jwtTokenEntity: JwtTokenEntity): Promise<boolean>;
    getTokenByToken(token: string): Promise<JwtToken | null>;
    revokeToken(token: string): Promise<boolean>;
    isTokenRevoked(token: string): Promise<boolean>;
    deleteToken(token: string): Promise<boolean>;
    deleteTokensByUserId(userId: number): Promise<boolean>;
    expireLatestToken(userIdPk: number): Promise<void>;
    getLatestValidToken(userIdPk: number): Promise<string | null | undefined>
}