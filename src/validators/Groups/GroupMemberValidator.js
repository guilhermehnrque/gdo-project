const { checkSchema, validationResult } = require('express-validator');

const groupSchema = {
    'group_id': {
        in: ['body'],
        isInteger: {
            errorMessage: 'group_id should be a type of integer'
        },
        notEmpty: {
            errorMessage: 'group_id cannot be an empty integer'
        }
    },
    
};

const groupMemberValidator = [
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
    groupMemberValidator
};