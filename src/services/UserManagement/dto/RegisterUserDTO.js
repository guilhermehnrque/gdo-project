class RegisterUserDTO {
    constructor({ name, surname, type, status, isStaff, login, password, phoneNumber }) {
        this.name = name;
        this.surname = surname;
        this.type = type;
        this.status = status;
        this.isStaff = isStaff;
        this.login = login;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    static fromRequest(payload) {
        return new RegisterUserDTO({
            name: payload.name,
            surname: payload.surname,
            type: payload.type,
            status: payload.status,
            isStaff: payload.is_staff,
            login: payload.login,
            password: payload.password,
            phoneNumber: payload.phone_number
        });
    }

}

module.exports = RegisterUserDTO