import { Router, Request, Response } from 'express';
import { GuestController } from '../../../controllers/organizer/GuestController';

const router = Router();
const guestController = new GuestController();

router.post('/', async (req: Request, res: Response) => { guestController.registerGuest(req, res) });
router.get('/:listId', async (req: Request, res: Response) => { guestController.getAllGuestsByListId(req, res) });
router.put('/:guestId', async (req: Request, res: Response) => { guestController.updateGuest(req, res) });
router.delete('/:guestId', async (req: Request, res: Response) => { guestController.deleteGuest(req, res) });

export default router;
