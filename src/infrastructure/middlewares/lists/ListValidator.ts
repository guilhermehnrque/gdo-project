import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';

const schemas = {
    register: [
        body('description')
            .notEmpty().withMessage('Descrição é obrigatória')
            .isString().withMessage('Descrição deve ser uma string'),

        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um boolean'),

        body('scheduleId')
            .notEmpty().withMessage('Id do agendamento é obrigatório')
            .isNumeric().withMessage('Id do agendamento deve ser um número')
    ],

    get: [
        param('id')
            .notEmpty().withMessage('Id é obrigatório')
            .isNumeric().withMessage('Id deve ser um número')
    ],
    
    update: [
        body('description')
            .notEmpty().withMessage('Descrição é obrigatória')
            .isString().withMessage('Descrição deve ser uma string'),

        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um boolean'),

        body('scheduleId')
            .notEmpty().withMessage('Id do agendamento é obrigatório')
            .isNumeric().withMessage('Id do agendamento deve ser um número'),

        param('id')
            .notEmpty().withMessage('Id é obrigatório')
            .isNumeric().withMessage('Id deve ser um número')
    ]
}

export { schemas, handleValidationErrors };
