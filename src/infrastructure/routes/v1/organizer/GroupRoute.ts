import { Router, Request, Response } from 'express';
import GroupController from '../../../controllers/GroupController';
import { schemas, handleValidationErrors } from '../../../middlewares/Group/GroupValidator';

const router = Router();

const groupController = new GroupController();

router.get('', async (req: Request, res: Response) => { groupController.getUserGroupsByUserId(req, res); });
router.post('', schemas.register, handleValidationErrors, async (req: Request, res: Response) => { groupController.createGroup(req, res); });
router.get('/:groupId', schemas.detail, async (req: Request, res: Response) => { groupController.getGroupById(req, res); });

export default router;
