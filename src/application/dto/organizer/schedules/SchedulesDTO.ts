export class ScheduleDTO {
    dayOfWeek: string;
    active: boolean;
    startTime: string;
    endTime: string;
    schedulingStatus: boolean;
    executeBeforeDays: number | null;
    executeInHour: string | null;
    group: GroupDTO;
    local: LocalDTO;
    createdAt: Date;
    updatedAt: Date | null | undefined;

    constructor(data: Partial<ScheduleDTO>) {
        this.dayOfWeek = data.dayOfWeek!;
        this.active = data.active!;
        this.startTime = data.startTime!;
        this.endTime = data.endTime!;
        this.schedulingStatus = data.schedulingStatus!;
        this.executeBeforeDays = data.executeBeforeDays!;
        this.executeInHour = data.executeInHour!;
        this.group = new GroupDTO(data.group!);
        this.local = new LocalDTO(data.local!);
        this.createdAt = data.createdAt!;
        this.updatedAt = data.updatedAt!;
    }
}

export class LocalDTO {
    description: string;
    state: string;
    city: string;
    street: string;
    number: number | null;
    zipCode: number;
    createdAt: Date;
    updatedAt: Date | null | undefined;

    constructor(data: Partial<LocalDTO>) {
        this.description = data.description!;
        this.state = data.state!;
        this.city = data.city!;
        this.street = data.street!;
        this.number = data.number!;
        this.zipCode = data.zipCode!;
        this.createdAt = data.createdAt!;
        this.updatedAt = data.updatedAt!;
    }
}

export class GroupDTO {
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null | undefined;

    constructor(data: Partial<GroupDTO>) {
        this.description = data.description!;
        this.isActive = data.isActive!;
        this.createdAt = data.createdAt!;
        this.updatedAt = data.updatedAt!;
    }
}
