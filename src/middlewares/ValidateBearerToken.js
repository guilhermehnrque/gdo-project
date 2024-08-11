const JwtUtils = require('../utils/JwtUtils');

class ValidateBearerToken {
    static async validateBearerToken(request, response, next) {
        const token = ValidateBearerToken.getTokenFromHeader(request)

        if (!token) {
            return ValidateBearerToken.handleUnauthorized(response, 'Token not provided')
        }

        if (!await ValidateBearerToken.isTokenValid(token)) {
            return ValidateBearerToken.handleUnauthorized(response, 'Invalid token')
        }

        next();
    }

    static getTokenFromHeader(request) {
        return request.headers.authorization?.split(' ')[1];
    }

    static handleUnauthorized(response) {
        return response.status(401).json({ message: 'Unauthorized' })
    }

    static async isTokenValid() {
        try {
            await JwtUtils.verifyToken(token)

            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = ValidateBearerToken;