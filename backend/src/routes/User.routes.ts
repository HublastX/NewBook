import { Router } from 'express';
import { UserController } from '../controllers/User.Controller';
import { authMiddleware } from '../middlewares/auth';
import adminMiddleware from '../middlewares/adminMiddleware';

const router = Router();

// rota que só o admin pode acessar
router.get('/users', authMiddleware, adminMiddleware, UserController.getAllUser);

// rotas que qualquer usuário autenticado pode acessar
router.get('/users/:id', authMiddleware, UserController.getByIdUser);
router.put('/users/:id', authMiddleware, UserController.updateUser);
router.delete('/users/:id', authMiddleware, UserController.deleteUser);

export default router;
