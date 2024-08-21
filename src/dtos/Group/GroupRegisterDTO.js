class GroupRegisterDTO {
    constructor({ description, local }) {
        this.description = description;
        this.local = {
            country: local.country,
            state: local.state,
            city: local.city,
            street: local.street,
            zip_code: local.zip_code,
            number: local.number,
            description: local.description
        };
    }

    static fromRequest(payload) {
        return new GroupRegisterDTO({
            description: payload.group.description,
            local: {
                country: payload.local.country,
                state: payload.local.state,
                city: payload.local.city,
                street: payload.local.street,
                zip_code: payload.local.zip_code,
                number: payload.local.number,
                description: payload.local.description
            }
        });
    }

    getDescription = () => {
        return this.description;
    }

    getLocal = () => {
        return this.local;
    }

}

module.exports = GroupRegisterDTO;
