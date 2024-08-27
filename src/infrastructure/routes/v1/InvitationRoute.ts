import express, { Request, Response } from 'express';
import { InvitationController } from '../../controllers/InvitationController';
import { schemas, handleValidationErrors } from '../../middlewares/invitation/InvitationValidator';

const router = express.Router();

const invitationController = new InvitationController();

router.post('/', [...schemas.register], handleValidationErrors, (req: Request, res: Response) => { invitationController.createInvitation(req, res); });
router.get('/:invitationCode', (req: Request, res: Response) => { invitationController.getInvitationByCode(req, res); });

// PUT /v1/invitation/:id
router.put('/:id', (req: Request, res: Response) => {
    // TODO: Implement logic to update an invitation
    res.send(`PUT /v1/invitation/${req.params.id}`);
});

// DELETE /v1/invitation/:id
router.delete('/:id', (req: Request, res: Response) => {
    // TODO: Implement logic to delete an invitation
    res.send(`DELETE /v1/invitation/${req.params.id}`);
});

export default router;