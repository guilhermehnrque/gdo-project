import { Router, Request, Response } from 'express';
import { PlayersListsController } from '../../../controllers/organizer/PlayersListsController';
import { handleValidationErrors, schemas } from '../../../middlewares/playersList/PlayersListValidator';

const router = Router();

const playersListsController = new PlayersListsController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { playersListsController.registerPlayer(req, res) });
router.get('/detail/:listId/', async (req: Request, res: Response) => { playersListsController.getPlayerList(req, res) });
router.get('/player/:playerId', async (req: Request, res: Response) => { playersListsController.getPlayerLists(req, res) });
router.put('/list/:listId', [...schemas.update, handleValidationErrors] ,async (req: Request, res: Response) => { playersListsController.updatePlayer(req, res) });
router.delete('/list/:listId/player/:playerId', [...schemas.delete, handleValidationErrors],async (req: Request, res: Response) => { playersListsController.removePlayer(req, res) });

export default router