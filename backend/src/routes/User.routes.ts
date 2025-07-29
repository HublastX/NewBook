import { Router } from 'express';
import { UserController } from '../controllers/User.Controller';

const router = Router();

router.get('/users', UserController.getAllUser);
router.get('/users/:id', UserController.getByIdUser);
router.post('/users', UserController.CreateUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;