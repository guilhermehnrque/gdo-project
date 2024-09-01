import { Router, Request, Response } from 'express';
import { schemas, handleValidationErrors } from '../../../middlewares/lists/ListValidator';
import { ListController } from '../../../controllers/organizer/ListController';

const router = Router();

const listController = new ListController();

router.post('/', [...schemas.register, handleValidationErrors], async (req: Request, res: Response) => { listController.createList(req, res) });
router.get('/', async (req: Request, res: Response) => { listController.getAllListsByOrganizerId(req, res) });
router.get('/:listId', [...schemas.get, handleValidationErrors], async (req: Request, res: Response) => { listController.getDetailsListById(req, res) });
router.put('/:listId', [...schemas.update, handleValidationErrors], async (req: Request, res: Response) => { listController.updateListById(req, res) });
router.patch('/:listId', [...schemas.get, handleValidationErrors], async (req: Request, res: Response) => { listController.updateListStatusById(req, res) });

export default router;