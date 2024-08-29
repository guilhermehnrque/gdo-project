export enum UserTypes {
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER',
    STAFF = 'STAFF',
    GUEST = 'GUEST',
}

export function allowedUserTypes(): UserTypes[] {
   return [UserTypes.PLAYER, UserTypes.STAFF, UserTypes.GUEST];
}   

export function allowUserToCreateGroup (userType: string): boolean {
    return userType === UserTypes.STAFF.toString();
}