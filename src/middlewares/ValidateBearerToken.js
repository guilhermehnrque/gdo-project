const JwtUtils = require('../utils/JwtUtils');
const logger = require('../utils/LoggerUtils');

class ValidateBearerToken {
    static async validateBearerToken(request, response, next) {
        const token = ValidateBearerToken.getTokenFromHeader(request)

        if (!token) {
            return ValidateBearerToken.handleUnauthorized(response, 'Token not provided')
        }
        const decoded = await JwtUtils.verifyToken(token)

        if (!decoded) {
            return ValidateBearerToken.handleUnauthorized(response, 'Invalid token')
        }

        request.userType = decoded.type
        request.userId = decoded.userId

        next();
    }

    static getTokenFromHeader(request) {
        return request.headers.authorization?.split(' ')[1];
    }

    static handleUnauthorized(response) {
        logger.error('Unauthorized request')
        return response.status(401).json({ message: 'Unauthorized' })
    }

    static async isTokenValid(token) {
        try {
            return await JwtUtils.verifyToken(token)
        } catch (error) {
            return false
        }
    }
}

module.exports = ValidateBearerToken;