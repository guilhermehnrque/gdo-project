export enum PlayerListStatusEnum {
    CONFIRMADO = 'CONFIRMADO',
    DESISTENCIA = 'DESISTENCIA',
    CONFIRMACAO_PENDENTE = 'CONFIRMACAO_PENDENTE',
}

export function allowedPlayerListStatus(): PlayerListStatusEnum[] {
    return [PlayerListStatusEnum.CONFIRMADO, PlayerListStatusEnum.DESISTENCIA, PlayerListStatusEnum.CONFIRMACAO_PENDENTE];
}