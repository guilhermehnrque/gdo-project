import { Router, Request, Response } from 'express';
import GroupController from '../../controllers/GroupController';
import { schemas, handleValidationErrors } from '../../middlewares/Group/GroupValidator';

const router = Router();

const groupController = new GroupController();

router.post('/', schemas.register, handleValidationErrors, async (req: Request, res: Response) => { groupController.createGroup(req, res); });

export default router;
