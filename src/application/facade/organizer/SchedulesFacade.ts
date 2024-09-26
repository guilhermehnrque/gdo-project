import { ScheduleCreateRequest } from '../../../infrastructure/requests/organizer/schedules/ScheduleCreateRequest';
import { GetSchedulesUseCase } from '../../usecases/organizer/schedules/GetSchedulesUseCase';
import { CreateScheduleUseCase } from '../../usecases/organizer/schedules/CreateScheduleUseCase';
import { ScheduleDTO } from '../../dto/organizer/schedules/SchedulesDTO';
import { GetScheduleUseCase } from '../../usecases/organizer/schedules/GetScheduleUseCase';
import { UpdateScheduleUseCase } from '../../usecases/organizer/schedules/UpdateScheduleUseCase';
import { UpdateSchedulePayload } from '../../interfaces/payloads/UpdateSchedulePayload';
import { UpdateStatusSchedulePayload } from '../../interfaces/payloads/UpdateScheduleStatusPayload';
import { UpdateStatusScheduleUseCase } from '../../usecases/organizer/schedules/UpdateStatusScheduleUseCase';

export class SchedulesFacade {

    private createScheduleUseCase: CreateScheduleUseCase;
    private getSchedulesUseCase: GetSchedulesUseCase;
    private getScheduleUseCase: GetScheduleUseCase;
    private updateScheduleUseCase: UpdateScheduleUseCase;
    private updateStatusScheduleUseCase: UpdateStatusScheduleUseCase;

    constructor() {
        this.createScheduleUseCase = new CreateScheduleUseCase();
        this.getSchedulesUseCase = new GetSchedulesUseCase();
        this.getScheduleUseCase = new GetScheduleUseCase();
        this.updateScheduleUseCase = new UpdateScheduleUseCase();
        this.updateStatusScheduleUseCase = new UpdateStatusScheduleUseCase();
    }

    public async createSchedule(payload: ScheduleCreateRequest): Promise<boolean> {
        const { groupId, localId, playersLimit } = payload;
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
            executeInHour ?? null,
            playersLimit
        );

        return schedule;
    }

    public async getAllSchedulesByOrganizerId(organizerId: string): Promise<ScheduleDTO[]> {
        return await this.getSchedulesUseCase.execute(organizerId);
    }

    public async getScheduleByGroupId(organizerId: string, groupId: number): Promise<ScheduleDTO> {
        return await this.getScheduleUseCase.execute(organizerId, groupId);
    }

    public async updateScheduleById(payload: UpdateSchedulePayload): Promise<boolean> {
        return await this.updateScheduleUseCase.execute(
            payload.schedule.dayOfWeek,
            payload.schedule.startTime,
            payload.schedule.endTime,
            payload.groupId,
            payload.localId,
            payload.scheduling.isSchedulingActive,
            payload.scheduling.executeBeforeDays,
            payload.scheduling.executeInHour,
            payload.scheduleId,
            payload.playersLimit
        );
    }

    public async updateStatusByScheduleId(payload: UpdateStatusSchedulePayload, scheduleId: number): Promise<boolean> {
        return await this.updateStatusScheduleUseCase.execute(payload.active, scheduleId);
    }
}
