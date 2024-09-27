import { Router, Request, Response } from 'express';
import { PlayersGroupController } from '../../../controllers/player/PlayersGroupController';

const router = Router();

const playersGroupController = new PlayersGroupController();

router.get('', async (req: Request, res: Response) => { playersGroupController.listGroups(req, res); });
router.get('/:groupId', async (req: Request, res: Response) => { playersGroupController.groupDetail(req, res); });
router.get('/:groupId/schedule', async (req: Request, res: Response) => { playersGroupController.groupSchedule(req, res); });
router.get('/:groupId/lists', async (req: Request, res: Response) => { playersGroupController.groupList(req, res); });
router.post('/', async (req: Request, res: Response) => { playersGroupController.groupRegister(req, res); });
router.delete('/:groupId', async (req: Request, res: Response) => { playersGroupController.groupLeave(req, res); });

router.post('/list', async (req: Request, res: Response) => { playersGroupController.registerGroupList(req, res); });
router.patch('/:groupId/list/:listId', async (req: Request, res: Response) => { playersGroupController.leaveGroupList(req, res); });


export default router;