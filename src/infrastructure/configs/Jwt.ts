import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import logger from './LoggerConfig';

const secretKey = process.env.PROJECT_GDB_SECRET_KEY;

export default class JwtUtils {
    
    static async generateToken(payload: any) {
        const secrets = { 
            userId: payload.user_id,
            type: payload.type
        }

        return jwt.sign(secrets, secretKey!, { expiresIn: '100h' })
    }

    static async verifyToken(token: string): Promise<jwt.JwtPayload | boolean>{
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey as Secret, (err, decoded) => {
                if (err) {
                    logger.error(err);
                    resolve(false);
                } else {
                    resolve(decoded as JwtPayload);
                }
            });
        });
    }
}
