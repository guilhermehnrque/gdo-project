const { checkSchema, validationResult } = require('express-validator');

const groupSchema = {
    'active': {
        in: ['query'],
        isBoolean: {
            errorMessage: 'active should be a type of boolean'
        },
        notEmpty: {
            errorMessage: 'active cannot be an empty field'
        }
    },
    'groupId': {
        in: ['path'],
        isBoolean: {
            errorMessage: 'groupId should be a type of text'
        },
        notEmpty: {
            errorMessage: 'groupId cannot be an empty text'
        }
    },
    
};

const validateGroupStatusValidator = [
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
    validateGroupStatusValidator
};