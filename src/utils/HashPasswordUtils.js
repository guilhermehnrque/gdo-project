const bcrypt = require('bcrypt')
const saltRounds = process.env.PROJECT_GDB_SALT_ROUNDS
const secretKey = process.env.PROJECT_GDB_SECRET_KEY

class HashPassword {
    static async hashPassword(password) {
        return await bcrypt.hash(password, parseInt(saltRounds))
    }

    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash)
    }

    static async hashPasswordWithSecretKey(password) {
        return await bcrypt.hash(password, parseInt(secretKey))
    }

    static async comparePasswordWithSecretKey(password, hash) {
        return await bcrypt.compare(password, hash)
    }
}

module.exports = HashPassword