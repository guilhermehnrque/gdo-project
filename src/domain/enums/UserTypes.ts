export enum UserTypes {
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER',
    STAFF = 'STAFF',
    GUEST = 'GUEST',
}

export function allowedUserTypes(): UserTypes[] {
   return [UserTypes.PLAYER, UserTypes.STAFF, UserTypes.GUEST];
}   