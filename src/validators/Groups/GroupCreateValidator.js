const { checkSchema, validationResult } = require('express-validator');

const groupSchema = {
    'group.description': {
        in: ['body'],
        isString: {
            errorMessage: 'description should be a type of text'
        },
        notEmpty: {
            errorMessage: 'description cannot be an empty field'
        }
    },
    'local.country': {
        in: ['body'],
        isString: {
            errorMessage: 'country should be a type of text'
        },
        notEmpty: {
            errorMessage: 'country cannot be an empty field'
        }
    },
    'local.state': {
        in: ['body'],
        isString: {
            errorMessage: 'state should be a type of text'
        },
        notEmpty: {
            errorMessage: 'state cannot be an empty field'
        }
    },
    'local.city': {
        in: ['body'],
        isString: {
            errorMessage: 'city should be a type of text'
        },
        notEmpty: {
            errorMessage: 'city cannot be an empty field'
        }
    },
    'local.street': {
        in: ['body'],
        isString: {
            errorMessage: 'street should be a type of text'
        },
        notEmpty: {
            errorMessage: 'street cannot be an empty field'
        }
    },
    'local.number': {
        in: ['body'],
        isString: {
            errorMessage: 'number should be a type of text'
        }
    },
    'local.zip_code': {
        in: ['body'],
        isString: {
            errorMessage: 'zip_code should be a type of text'
        },
        notEmpty: {
            errorMessage: 'zip_code cannot be an empty field'
        }
    },
    'local.description': {
        in: ['body'],
        isString: {
            errorMessage: 'description should be a type of text'
        },
        notEmpty: {
            errorMessage: 'description cannot be an empty field'
        }
    }
};

const validateGroupCreate = [
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
    validateGroupCreate
};