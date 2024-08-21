class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotFoundError'
        this.statusCode = 400
    }
}

module.exports = UserNotFoundError