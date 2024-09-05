import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../../middlewares/group/GroupValidator';
import { GroupController } from '../../../controllers/GroupController';

const router = Router();

const groupController = new GroupController();

router.get('', async (req: Request, res: Response) => { groupController.getUserGroupsByUserId(req, res); });
router.post('', schemas.register, handleValidationErrors, async (req: Request, res: Response) => { groupController.createGroup(req, res); });
router.get('/:groupId', schemas.detail, handleValidationErrors, async (req: Request, res: Response) => { groupController.getGroupById(req, res); });
router.put('/:groupId', schemas.update, handleValidationErrors, async (req: Request, res: Response) => { groupController.updateGroupById(req, res); });
router.patch('/:groupId/status', schemas.updateStatus, handleValidationErrors, async (req: Request, res: Response) => { groupController.changeGroupStatus(req, res); });
router.delete('/:groupId', schemas.delete, handleValidationErrors, async (req: Request, res: Response) => { groupController.deleteGroupById(req, res); });
router.post('/members', schemas.addOrRemoverMember, handleValidationErrors, async (req: Request, res: Response) => { groupController.addUserToGroup(req, res); });
router.delete('/members/removal', schemas.addOrRemoverMember, handleValidationErrors, async (req: Request, res: Response) => { groupController.removeUserFromGroup(req, res); });
router.get('/members/:groupId', schemas.detail, handleValidationErrors, async (req: Request, res: Response) => { groupController.getGroupMembers(req, res); });

export default router;
