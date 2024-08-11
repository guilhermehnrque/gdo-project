const jwt = require('jsonwebtoken');
const secretKey = process.env.PROJECT_GDB_SECRET_KEY;

class JwtUtils {
    static async generateToken(payload) {
        return jwt.sign(payload, secretKey, { expiresIn: '1h' })
    }

    static async verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
        // return jwt.verify(token, secretKey);
    }
}

module.exports = JwtUtils
