const HashPassword = require('../utils/HashPasswordUtils')

class UserEntity {
    constructor() {
        this.id = null
        this.name = null
        this.surname = null
        this.type = null
        this.status = null
        this.is_staff = null
        this.phone_number = null
        this.login = null
        this.password = null
    }

    static async toRegistration(data) {
        let userEntity = new UserEntity()
        userEntity.name = data.name
        userEntity.surname = data.surname
        userEntity.type = data.type
        userEntity.status = data.status
        userEntity.is_staff = data.isStaff
        userEntity.phone_number = data.phoneNumber
        userEntity.login = data.login
        userEntity.password = await HashPassword.hashPassword(data.password)

        return userEntity
    }

}

module.exports = UserEntity