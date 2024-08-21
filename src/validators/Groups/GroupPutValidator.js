const { checkSchema, validationResult } = require('express-validator');

const groupSchema = {
    'description': {
        in: ['body'],
        isString: {
            errorMessage: 'description should be a type of text'
        },
        notEmpty: {
            errorMessage: 'description cannot be an empty field'
        }
    },
    'active': {
        in: ['body'],
        isBoolean: {
            errorMessage: 'is_active should be a type of boolean'
        },
        notEmpty: {
            errorMessage: 'is_active cannot be an empty boolean'
        }
    },

    
};

const validateGroupPut = [
    checkSchema(groupSchema),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                message: err.msg,
                field: err.path
            }));

            return res.status(400).json({ errors: formattedErrors });
        }

        next();
    }
];

module.exports = {
    validateGroupPut
};