const LocalModel = require('../models/local')

class LocalRepository {
    async createLocal({ description, country, state, city, street, zip_code, number }, id, options = {}) {
        const zipCode = parseInt(zip_code)
        const localNumber = parseInt(number)

        return LocalModel.build({
            description,
            country,
            state,
            city,
            street,
            zip_code: zipCode,
            number: localNumber,
            groups_id: id
        }, options)
    }
}

module.exports = LocalRepository
