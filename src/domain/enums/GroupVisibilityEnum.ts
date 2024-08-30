export enum GroupVisibilityEnum {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export function allowedGroupVisibility(): GroupVisibilityEnum[] {
    return [GroupVisibilityEnum.PUBLIC, GroupVisibilityEnum.PRIVATE];
}

export function getGroupVisibility(visibility: string): GroupVisibilityEnum {
    return GroupVisibilityEnum[visibility.toUpperCase() as keyof typeof GroupVisibilityEnum]
}