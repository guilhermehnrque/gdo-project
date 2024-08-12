const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const logger = require('./LoggerUtils');

const secretKey = process.env.PROJECT_GDB_SECRET_KEY;

const verifyTokenAsync = promisify(jwt.verify);

class JwtUtils {
    
    static async generateToken(payload) {
        const secrets = { 
            userId: payload.userId,
            type: payload.type
        }

        return jwt.sign(secrets, secretKey, { expiresIn: '1h' })
    }

    static async verifyToken(token) {
        try {
            const decoded = await verifyTokenAsync(token, secretKey);
            return decoded;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

module.exports = JwtUtils
