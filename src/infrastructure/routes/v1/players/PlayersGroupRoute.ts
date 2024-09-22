import { Router, Request, Response } from 'express';

const router = Router();

// Listar grupos que é participante
router.get('', async (req: Request, res: Response) => { res.json({ message: 'This is the group route' }); });

// Listar detalhes do grupo do participante / Acessar grupo que é participante
// Contém informação da lista e membros do grupo
router.get('/:groupId', async (req: Request, res: Response) => { res.json({ message: 'This is the group detail route' }); });

// Verificar se existe lista disponível 
router.get('/:groupId/list', async (req: Request, res: Response) => { res.json({ message: 'This is the group list route' }); });

// Se registar na lista do grupo 
router.post('/:groupId/list', async (req: Request, res: Response) => { res.json({ message: 'This is the group list route' }); });

// Atualizar seu estatus da lista do grupo (desisti ou confirmar)
router.put('/:groupId/list', async (req: Request, res: Response) => { res.json({ message: 'This is the group list route' }); });

// Sair do grupo
router.delete('/:groupId', async (req: Request, res: Response) => { res.json({ message: 'This is the group list route' }); });


export default router;