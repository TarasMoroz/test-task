import { Router } from 'express';
import { UserHandlers } from '../controllers/UserController';

export const userRoutes = Router();

// get list
userRoutes.get('/', UserHandlers.getCollection);

// get one
userRoutes.get('/:userId', UserHandlers.getOne);

// create
userRoutes.post('/', UserHandlers.createOne);

// update
userRoutes.patch('/:userId', UserHandlers.updateOne);

// delete
userRoutes.delete('/:userId', UserHandlers.deleteOne);