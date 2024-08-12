const { body } = require('express-validator');

const userValidator = {
    createUser: [
        body('name')
            .notEmpty().withMessage('Nome é obrigatório')
            .isString().withMessage('Nome deve ser uma string'),
        
        body('surname')
            .notEmpty().withMessage('Sobrenome é obrigatório')
            .isString().withMessage('Sobrenome deve ser uma string'),
        
        body('type')
            .notEmpty().withMessage('Tipo é obrigatório')
            .isString().withMessage('Tipo deve ser uma string'),
        
        body('status')
            .optional().isBoolean().withMessage('Status deve ser um valor booleano'),
        
        body('is_staff')
            .optional().isBoolean().withMessage('is_staff deve ser um valor booleano'),
        
        body('login')
            .notEmpty().withMessage('Login é obrigatório')
            .isString().withMessage('Email inválido'),
        
        body('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
        
        body('phone_number')
            .notEmpty().withMessage('Número de telefone é obrigatório')
            .isNumeric().withMessage('Número de telefone deve ser numérico'),
    ],

    loginUser: [
        body('login')
            .notEmpty().withMessage('Informe um login válido')
            .isString().withMessage('Email inválido'),
        
        body('password')
            .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres'),
    ],
};

module.exports = userValidator;
