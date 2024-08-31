import { ScheduleCreateRequest } from '../../../infrastructure/requests/organizer/schedules/ScheduleCreateRequest';
import { GetSchedulesUseCase } from '../../usecases/organizer/schedules/GetSchedulesUseCase';
import { CreateScheduleUseCase } from '../../usecases/organizer/schedules/CreateScheduleUseCase';
import { ScheduleDTO } from '../../dto/organizer/schedules/SchedulesDTO';
import { GetScheduleUseCase } from '../../usecases/organizer/schedules/GetScheduleUseCase';

export class SchedulesFacade {

    private createScheduleUseCase: CreateScheduleUseCase;
    private getSchedulesUseCase: GetSchedulesUseCase;
    private getScheduleUseCase: GetScheduleUseCase

    constructor() {
        this.createScheduleUseCase = new CreateScheduleUseCase();
        this.getSchedulesUseCase = new GetSchedulesUseCase();
        this.getScheduleUseCase = new GetScheduleUseCase();
    }

    public async createSchedule(payload: ScheduleCreateRequest): Promise<boolean> {
        const { groupId, localId } = payload;
        const { dayOfWeek, startTime, endTime } = payload.schedule;
        const { isSchedulingActive, executeBeforeDays, executeInHour } = payload.scheduling;

        const schedule = await this.createScheduleUseCase.execute(
            dayOfWeek,
            startTime,
            endTime,
            groupId,
            localId,
            isSchedulingActive,
            executeBeforeDays ?? null,
            executeInHour ?? null
        );

        return schedule;
    }

    public async getAllSchedulesByOrganizerId(organizerId: string): Promise<ScheduleDTO[]> {
        return await this.getSchedulesUseCase.execute(organizerId);
    }

    public async getScheduleByGroupId(organizerId: string, groupId: number): Promise<ScheduleDTO> {
        return await this.getScheduleUseCase.execute(organizerId, groupId);
    }
}
