class InvalidUserTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidUserTypeError'
        this.statusCode = 422
    }
}

module.exports = InvalidUserTypeError