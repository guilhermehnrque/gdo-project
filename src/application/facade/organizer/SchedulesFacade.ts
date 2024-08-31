import { ScheduleCreateRequest } from '../../../infrastructure/requests/organizer/schedules/ScheduleCreateRequest';
import { CreateScheduleUseCase } from '../../usecases/schedules/CreateScheduleUseCase';

export class SchedulesFacade {

    private createScheduleUseCase: CreateScheduleUseCase;

    constructor() {
        this.createScheduleUseCase = new CreateScheduleUseCase();
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
}
