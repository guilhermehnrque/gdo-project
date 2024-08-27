import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';

const schemas = {
    register: [
        body('invite.guest_id')
            .notEmpty().withMessage('guest_id é obrigatório')
            .isString().withMessage('guest_id deve ser uma string'),

        body('invite.group_id')
            .notEmpty().withMessage('group_id é obrigatório')
            .isNumeric().withMessage('group_id deve ser uma string'),

    ],

    getInvite: [
        param('invitationCode')
            .notEmpty().withMessage('Código de convite é obrigatório')
            .isString().withMessage('Código de convite deve ser uma string'),
    ],


};

export { schemas, handleValidationErrors };
