import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';

const schemas = {
    register: [
        body('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        body('playersId')
            .notEmpty().withMessage('Id dos jogadores é obrigatório')
            .isArray().withMessage('Id dos jogadores deve ser um array'),

        body('playerStatus')
            .notEmpty().withMessage('Status do jogador é obrigatório')
            .isString().withMessage('Status do jogador deve ser uma string')
    ],

    update: [
        body('listId')
            .notEmpty().withMessage('listId é obrigatório')
            .isNumeric().withMessage('listId deve ser um número'),

        body('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número'),

        body('playerStatus')
            .notEmpty().withMessage('Status do jogador é obrigatório')
            .isString().withMessage('Status do jogador deve ser uma string')
    ],

    put: [
        param('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),
    ],

    delete: [
        param('listId')
            .notEmpty().withMessage('Id da lista é obrigatório')
            .isNumeric().withMessage('Id da lista deve ser um número'),

        param('playerId')
            .notEmpty().withMessage('Id do jogador é obrigatório')
            .isNumeric().withMessage('Id do jogador deve ser um número')
    ],

}

export { schemas, handleValidationErrors };
