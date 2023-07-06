import express from 'express';
import { adminAuthRoute } from '../admins/routes/adminAuthRoutes';
import { adminCRUDRoutes } from '../admins/routes/adminCRUDroutes';
import { userRoutes } from '../users/routes/user';
import { getAuthMiddleware } from '../infra/services/middlewareInjection';


export const routes = express.Router();

const auth = getAuthMiddleware();

routes.use('/admin', adminAuthRoute);
routes.use('/admin', auth, adminCRUDRoutes);
routes.use('/users', auth, userRoutes);