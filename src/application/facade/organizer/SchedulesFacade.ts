import { ScheduleCreateParams, ScheduleCreateRequest } from '../../../infrastructure/requests/organizer/schedules/ScheduleCreateRequest';
import { CreateScheduleUseCase } from '../../usecases/schedules/CreateScheduleUseCase';

export class SchedulesFacade {

    private createScheduleUseCase: CreateScheduleUseCase;

    constructor() {
        this.createScheduleUseCase = new CreateScheduleUseCase();
    }

    public async createSchedule(payload: ScheduleCreateRequest, param: ScheduleCreateParams): Promise<void> {
        const { dayOfWeek, startTime, endTime } = payload.schedule;
        const { scheduling, executeBeforeDays, executeInHour } = payload.schedling;
        const { groupId } = param;

        const schedule = await this.createScheduleUseCase.execute(
            dayOfWeek,
            startTime,
            endTime,
            groupId,
            scheduling,
            executeBeforeDays,
            executeInHour
        );

    }
}
