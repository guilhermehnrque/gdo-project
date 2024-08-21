const { checkSchema, validationResult } = require('express-validator');

const groupDetailSchema = {
    'groupId': {
        in: ['path'],
        isString: {
            errorMessage: 'groupId should be a type of text'
        },
        notEmpty: {
            errorMessage: 'GroupId should be declared Path Variable'
        }
    },
    
};

const validateGroupDetail = [
    checkSchema(groupDetailSchema),
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
    validateGroupDetail
};