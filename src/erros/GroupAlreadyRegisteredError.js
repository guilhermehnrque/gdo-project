class GroupAlreadyRegisteredError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GroupAlreadyRegisteredError'
        this.statusCode = 422
    }
}

module.exports = GroupAlreadyRegisteredError