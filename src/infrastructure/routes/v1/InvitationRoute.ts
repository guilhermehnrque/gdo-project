import express, { Request, Response } from 'express';
import { InvitationController } from '../../controllers/InvitationController';

const router = express.Router();

const invitationController = new InvitationController();


router.post('/', (req: Request, res: Response) => { invitationController.createInvitation(req, res); });

// GET /v1/invitation
router.get('/', (req: Request, res: Response) => {
    // TODO: Implement logic to retrieve invitation data
    res.send('GET /v1/invitation');
});

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