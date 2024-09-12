export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
}

export function getStatusFromString(status: string): InvitationStatus | undefined {
    const statusMap: { [key: string]: InvitationStatus } = {
        'pending': InvitationStatus.PENDING,
        'accepted': InvitationStatus.ACCEPTED,
        'rejected': InvitationStatus.REJECTED,
        'expired': InvitationStatus.EXPIRED
    };

    return statusMap[status.toLowerCase()];
}