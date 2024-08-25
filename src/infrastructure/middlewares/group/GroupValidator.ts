import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';

const schemas = {
    register: [
        body('group.description')
            .notEmpty().withMessage('A descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),

        body('local.country')
            .notEmpty().withMessage('País é obrigatório')
            .isString().withMessage('País deve ser uma string'),

        body('local.state')
            .notEmpty().withMessage('Estado é obrigatório')
            .isString().withMessage('Estado deve ser uma string'),

        body('local.city')
            .notEmpty().withMessage('Cidade é obrigatório')
            .isString().withMessage('Cidade deve ser uma string'),

        body('local.street')
            .notEmpty().withMessage('Rua é obrigatório')
            .isString().withMessage('Rua deve ser uma string'),

        body('local.number')
            .optional()
            .isNumeric().withMessage('Número deve ser uma numérico'),

        body('local.zip_code')
            .notEmpty().withMessage('Cep é obrigatório')
            .isNumeric().withMessage('Cep deve ser um numérico'),

        body('local.description')
            .notEmpty().withMessage('Descrição é obrigatório')
            .isString().withMessage('Descrição deve ser uma string'),
    ],

    detail: [
        param('groupId')
            .isString().withMessage('groupId should be a type of text')
            .notEmpty().withMessage('GroupId should be declared Path Variable')
    ]

};

export { schemas, handleValidationErrors };
