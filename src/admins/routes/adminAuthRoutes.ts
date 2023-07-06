import { Router } from 'express';
import { login, refresh } from '../controllers/AdminAuthController';

export const adminAuthRoute = Router();

// There is need for the only one admin management

// login
adminAuthRoute.post('/login', login);

// refresh bearer token
adminAuthRoute.post('/refresh', refresh);

// register
// adminAuthRoute.post('/admin/register', register);