import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import logger from './LoggerConfig';

const secretKey = process.env.PROJECT_GDB_SECRET_KEY;

const verifyTokenAsync = promisify(jwt.verify);

export default class JwtUtils {
    
    static async generateToken(payload: any) {
        const secrets = { 
            userId: payload.user_id,
            type: payload.type
        }

        return jwt.sign(secrets, secretKey ?? '', { expiresIn: '100h' })
    }

    static async verifyToken(token: any) {
        try {
            return await verifyTokenAsync(token);
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}
