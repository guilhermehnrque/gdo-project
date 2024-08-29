import { JwtTokenEntity } from "../entity/JwtTokenEntity";
import JwtTokenModel from "../models/JwtTokenModel";

export interface JwtTokensRepositoryInterface {
    saveToken(jwtTokenEntity: JwtTokenEntity): Promise<boolean>;
    getTokenByToken(token: string): Promise<JwtTokenModel | null>;
    revokeToken(token: string): Promise<boolean>;
    isTokenRevoked(token: string): Promise<boolean>;
    deleteToken(token: string): Promise<boolean>;
    deleteTokensByUserId(userId: number): Promise<boolean>;
    deleteExpiredTokens(): Promise<boolean>;
}