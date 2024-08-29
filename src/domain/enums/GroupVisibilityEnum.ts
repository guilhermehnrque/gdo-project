export enum GroupVisibilityEnum {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export function allowedGroupVisibility(): GroupVisibilityEnum[] {
    return [GroupVisibilityEnum.PUBLIC, GroupVisibilityEnum.PRIVATE];
}