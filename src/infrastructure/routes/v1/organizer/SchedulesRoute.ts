import { Router, Request, Response } from 'express';
import { SchedulesController } from '../../../controllers/organizer/SchedulesController';
import { schemas, handleValidationErrors } from '../../../middlewares/schedules/SchedulesValidator';

const router = Router();

const schedulesController = new SchedulesController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.createSchedule(req, res); });
router.get('', async (req: Request, res: Response) => { schedulesController.getAllSchedulesByOrganizerId(req, res); });
router.get('/group/:groupId', async (req: Request, res: Response) => { schedulesController.getScheduleByGroupId(req, res); });
router.put('/:scheduleId', [...schemas.update, handleValidationErrors], async (req: Request, res: Response) => { schedulesController.updateScheduleById(req, res); });
router.put('/:scheduleId/status', async (req: Request, res: Response) => { schedulesController.changeStatusScheduleById(req, res); });

export default router;