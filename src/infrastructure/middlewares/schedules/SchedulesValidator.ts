import { body, param } from 'express-validator';
import handleValidationErrors from '../HandleValidationErrors';
import { getDayOfWeekByString } from '../../../domain/enums/DayOfWeekEnum';

const schemas = {
    register: [
        body('schedule.dayOfWeek')
            .notEmpty().withMessage('Dia da semana é obrigatório')
            .custom((value) => {

                if (getDayOfWeekByString(value) === undefined) {
                    throw new Error('Dia da semana inválido');
                }

                return true;
            }),
        body('schedule.startTime')
            .notEmpty().withMessage('Hora de início é obrigatório')
            .isString().withMessage('Hora de início deve ser uma string'),

        body('schedule.endTime')
            .notEmpty().withMessage('Hora de término é obrigatório')
            .isString().withMessage('Hora de término deve ser uma string'),

        body('scheduling.isSchedulingActive')
            .notEmpty().withMessage('Agendamento ativo é obrigatório')
            .isBoolean().withMessage('Agendamento ativo deve ser um boolean'),

        body('scheduling.executeBeforeDays')
            .optional()
            .isNumeric().withMessage('Dias antes da execução deve ser um número'),

        body('scheduling.executeInHour')
            .optional()
            .isString().withMessage('Hora de execução deve ser uma string'),

        body('groupId')
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

        body('localId')
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),
    ],

    update: [
        body('schedule.dayOfWeek')
            .optional()
            .custom((value) => {

                if (getDayOfWeekByString(value) === undefined) {
                    throw new Error('Dia da semana inválido');
                }

                return true;
            }),
        body('schedule.startTime')
            .optional()
            .isString().withMessage('Hora de início deve ser uma string'),

        body('schedule.endTime')
            .optional()
            .isString().withMessage('Hora de término deve ser uma string'),

        body('scheduling.isSchedulingActive')
            .optional()
            .isBoolean().withMessage('Agendamento ativo deve ser um boolean'),

        body('scheduling.executeBeforeDays')
            .optional()
            .isNumeric().withMessage('Dias antes da execução deve ser um número'),

        body('scheduling.executeInHour')
            .optional()
            .isString().withMessage('Hora de execução deve ser uma string'),

        body('groupId')
            .optional()
            .isNumeric().withMessage('GroupId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('GroupId deve ser declarado no body'),

        body('localId')
            .optional()
            .isNumeric().withMessage('LocalId deve ser tdo tipo Inteiro')
            .notEmpty().withMessage('LocalId deve ser declarado no body'),
        
        param('scheduleId')
            .isNumeric().withMessage('Id deve ser um número')
            .notEmpty().withMessage('Id deve ser declarado no param')
    ]
}

export { schemas, handleValidationErrors };
