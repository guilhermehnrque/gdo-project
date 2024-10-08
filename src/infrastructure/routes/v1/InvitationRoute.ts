import express, { Request, Response } from 'express';
import { InvitationController } from '../../controllers/InvitationController';
import { schemas, handleValidationErrors } from '../../middlewares/invitation/InvitationValidator';

const router = express.Router();

const invitationController = new InvitationController();

router.post('/', [...schemas.register], handleValidationErrors, (req: Request, res: Response) => { invitationController.createInvitation(req, res); });
router.get('/:invitationCode', [...schemas.getInvite], handleValidationErrors, (req: Request, res: Response) => { invitationController.getInvitationByCode(req, res); });
router.patch('/:invitationCode/status/:status', [...schemas.getInvite], handleValidationErrors, (req: Request, res: Response) => { invitationController.acceptOrRecuseInvitationByCode(req, res); });
router.put('/:id', (req: Request, res: Response) => { res.send(`PUT /v1/invitation/${req.params.id}`); });

export default router;