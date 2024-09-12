import { Router, Request, Response } from 'express';
import { PlayersListsController } from '../../../controllers/organizer/PlayersListsController';
import { handleValidationErrors, schemas } from '../../../middlewares/playersList/PlayersListValidator';

const router = Router();

const playersListsController = new PlayersListsController();

router.post('', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { playersListsController.registerPlayer(req, res) });
router.get('/:groupId', async (req: Request, res: Response) => { playersListsController.getListOfPlayers(req, res) });
router.put('/:listId', [...schemas.update, handleValidationErrors] ,async (req: Request, res: Response) => { playersListsController.updatePlayer(req, res) });
router.delete('/delete/:listId/:playerId', [...schemas.delete, handleValidationErrors],async (req: Request, res: Response) => { playersListsController.removePlayer(req, res) });

export default router