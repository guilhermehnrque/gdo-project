class GroupUpdateDTO {
    constructor(attributes) {
        Object.assign(this, attributes)
    }

    static fromRequest(payload) {
        const attributes = {
            description: payload.description,
            active: payload.active,
        }

        return new GroupUpdateDTO(attributes);
    }

    toObject() {
        return { ...this }
    }
}

module.exports = GroupUpdateDTO;