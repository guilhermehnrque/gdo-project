const HashPassword = require('../utils/HashPasswordUtils')

class UserEntity {
    
    constructor(attributes) {
        Object.assign(this, attributes)
    }

    static async fromDTO(payload) {
        const attributes = {
            id: null,
            name: payload.name,
            surname: payload.surname,
            type: payload.type,
            status: payload.status,
            is_staff: payload.isStaff,
            phone_number: payload.phoneNumber,
            login: payload.login,
            password: await HashPassword.hashPassword(payload.password)
        }

        return new UserEntity(attributes)
    }

}

module.exports = UserEntity