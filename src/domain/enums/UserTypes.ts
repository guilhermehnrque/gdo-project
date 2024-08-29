export enum UserTypes {
    ADMIN = 'ADMIN',
    PLAYER = 'PLAYER',
    ORGANIZER = 'organizer',
    GUEST = 'GUEST',
}

export function allowedUserTypes(): UserTypes[] {
   return [UserTypes.PLAYER, UserTypes.ORGANIZER, UserTypes.GUEST];
}   

export function allowUserToCreateGroup (userType: string): boolean {
    return userType === UserTypes.ORGANIZER.toString();
}