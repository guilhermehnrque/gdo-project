class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidCredentialsError'
        this.statusCode = 422
    }
}

module.exports = InvalidCredentialsError