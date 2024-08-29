// Importações de módulos internos e bibliotecas
import logger from "../configs/LoggerConfig";

// Importações de entidades e modelos do domínio
import { JwtTokenEntity } from "../../domain/entity/JwtTokenEntity";
import JwtToken from "../../domain/models/JwtTokenModel";

// Importações de interfaces de repositório do domínio
import { JwtTokensRepositoryInterface } from "../../domain/repositories/JwtTokensRepositoryInterface";

// Importações de erros da aplicação
import DatabaseError from "../../application/erros/DatabaseError";

export class JwtTokensRepositoryImpl implements JwtTokensRepositoryInterface {

    async saveToken(jwtTokenEntity: JwtTokenEntity): Promise<boolean> {
        try {
            await JwtToken.create(jwtTokenEntity.toRegister());
            return true;
        } catch (error) {
            const { message } = error as Error
            this.logAndThrow(new DatabaseError("Error saving token"), `[JwtTokensRepositoryImpl] ${message}`);
            return false
        }
    }

    getTokenByToken(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    revokeToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    isTokenRevoked(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteToken(token: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteTokensByUserId(userId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteExpiredTokens(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    logAndThrow(error: Error, context: string) {
        logger.error(`${context}`);
        throw error;
    }

}