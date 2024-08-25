import { Router, Request, Response } from 'express';
import GroupController from '../../../controllers/GroupController';
import { schemas, handleValidationErrors } from '../../../middlewares/Group/GroupValidator';

const router = Router();

const groupController = new GroupController();

router.get('', async (req: Request, res: Response) => { groupController.getUserGroupsByUserId(req, res); });
router.post('', schemas.register, handleValidationErrors, async (req: Request, res: Response) => { groupController.createGroup(req, res); });
router.get('/:groupId', schemas.detail, handleValidationErrors, async (req: Request, res: Response) => { groupController.getGroupById(req, res); });
router.put('/:groupId', schemas.update, handleValidationErrors, async (req: Request, res: Response) => { groupController.updateGroupById(req, res); });

export default router;
