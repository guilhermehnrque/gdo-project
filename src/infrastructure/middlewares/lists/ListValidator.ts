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

        body('limitOfPlayers')
            .notEmpty().withMessage('Limite de jogadores é obrigatório')
            .isNumeric().withMessage('Limite de jogadores deve ser um número'),

        body('scheduleId')
            .notEmpty().withMessage('Id do agendamento é obrigatório')
            .isNumeric().withMessage('Id do agendamento deve ser um número'),

        body('groupId')
            .notEmpty().withMessage('Id do grupo é obrigatório')
            .isNumeric().withMessage('Id do grupo deve ser um número')
    ],

    get: [
        param('listId')
            .notEmpty().withMessage('Id é obrigatório')
            .isNumeric().withMessage('Id deve ser um número')
    ],

    update: [
        body('description')
            .optional()
            .custom((value) => {
                if (value === null || typeof value === 'string') {
                    return true;
                }

                throw new Error('Descrição deve ser uma string');
            }),

        body('status')
            .notEmpty().withMessage('Status é obrigatório')
            .isBoolean().withMessage('Status deve ser um boolean'),

        body('scheduleId')
            .notEmpty().withMessage('Id do agendamento é obrigatório')
            .isNumeric().withMessage('Id do agendamento deve ser um número'),

        param('listId')
            .notEmpty().withMessage('listId é obrigatório')
            .isNumeric().withMessage('listId deve ser um número')
    ]
}

export { schemas, handleValidationErrors };
