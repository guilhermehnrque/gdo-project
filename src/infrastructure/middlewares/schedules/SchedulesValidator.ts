import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';
import { allowedDaysOfWeek } from '../../../domain/enums/DayOfWeekEnum';

const schemas = {
    register: [
        body('dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .custom((value) => {
                if (!allowedDaysOfWeek().includes(value.toUpperCase())) {
                    throw new Error('Dia da semana inválido');
                }

                return true;
            }),
        body('startTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),
            
        body('endTime')
            .notEmpty().withMessage('Hora de término é obrigatório')
            .isString().withMessage('Hora de término deve ser uma string'),

        param('groupId')
            .isString().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado como Path Variable')

    ]
}

export { schemas, handleValidationErrors };
