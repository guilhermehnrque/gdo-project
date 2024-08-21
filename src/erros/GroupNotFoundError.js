class GroupNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GroupNotFoundError'
        this.statusCode = 422
    }
}

module.exports = GroupNotFoundError