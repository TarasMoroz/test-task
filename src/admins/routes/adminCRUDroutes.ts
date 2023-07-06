import { Router } from 'express';
import { updateAdminPassword } from '../controllers/AdminCRUDController';

export const adminCRUDRoutes = Router();

// There is need for the only one admin management

// get one
// adminCRUDRoutes.get('/', AdminHandlers.getOne);

// update
adminCRUDRoutes.patch('/update-password', updateAdminPassword);